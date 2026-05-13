import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  SquarePen,
  Copy,
  RotateCw,
  Printer,
  LayoutGrid,
  Download,
  SendHorizontal,
  Search,
  Building2,
  Home,
  Globe,
  Archive,
  Trash2,
  MoreVertical,
  MinusCircle,
  ChevronDown
} from 'lucide-react';
import GenerateBrochureModal from './modals/GenerateBrochureModal';

import { 
  usePublishPFListing,
  useUnpublishPFListing,
  useDeletePFListing 
} from '../../../features/property-finder/api';
import { useToast } from '../../../context/NotificationContext';

const ActionDropdown = ({ listingId, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropUp, setIsDropUp] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  // API Mutations
  const { mutateAsync: publish } = usePublishPFListing();
  const { mutateAsync: unpublish } = useUnpublishPFListing();
  const { mutateAsync: deleteListing } = useDeletePFListing();

  const updatePosition = useCallback(() => {
    if (!dropdownRef.current) return;
    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setIsDropUp(spaceBelow < 400 && spaceAbove > spaceBelow);
    setCoords({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    });
  }, []);

  const handleAction = async (label) => {
    try {
      if (label === 'Publish to PF') {
        await publish(listingId);
        addToast("Listing published to Property Finder!", "success");
      } else if (label === 'Unpublish from PF') {
        await unpublish(listingId);
        addToast("Listing withdrawn from Property Finder.", "success");
      } else if (label === 'Delete') {
        if (window.confirm("Are you sure you want to delete this listing? This will also remove it from connected portals.")) {
          await deleteListing(listingId);
          addToast("Listing deleted successfully.", "success");
        }
      } else if (label === 'Edit') {
        navigate(`/listings/edit/${listingId}`);
      } else if (label === 'Generate Brochure') {
        setIsBrochureModalOpen(true);
      } else {
        console.log(`${label} for ${listingId}`);
      }
    } catch (error) {
       // Handled by query hooks
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();

      const handleGlobalClick = (e) => {
        // Close if click is outside both trigger and menu
        const isClickInTrigger = dropdownRef.current?.contains(e.target);
        const isClickInMenu = menuRef.current?.contains(e.target);
        if (!isClickInTrigger && !isClickInMenu) {
          setIsOpen(false);
        }
      };

      const handleGlobalScroll = (e) => {
        // If it's scrolling inside the menu itself, do nothing (let it scroll)
        if (menuRef.current?.contains(e.target)) return;

        // For any other scroll (window or table), keep it open but update its position
        // so it stays anchored to the button
        updatePosition();
      };

      document.addEventListener('mousedown', handleGlobalClick);
      // Use capture: true to catch scrolls in parent containers (like the table)
      window.addEventListener('scroll', handleGlobalScroll, { capture: true, passive: true });
      window.addEventListener('resize', () => setIsOpen(false));

      return () => {
        document.removeEventListener('mousedown', handleGlobalClick);
        window.removeEventListener('scroll', handleGlobalScroll, { capture: true });
        window.removeEventListener('resize', () => setIsOpen(false));
      };
    }
  }, [isOpen, updatePosition]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  const menuGroups = [
    [
      { label: 'Edit', icon: SquarePen },
      { label: 'Duplicate Listing', icon: Copy },
      { label: 'Refresh Listing', icon: RotateCw },
    ],
    [
      { label: 'Download PDF as Logged-In Agent', icon: Printer },
      { label: 'Download PDF as Listing Agent', icon: Printer },
      { label: 'Download PDF as Listing Owner', icon: Printer },
    ],
    [
      { label: 'Export as Excel', icon: LayoutGrid },
      { label: 'Generate Brochure', icon: Download },
    ],
    [
      { label: 'Publish to all', icon: SendHorizontal },
      { label: 'Publish to PF', icon: Search },
      { label: 'Publish to Bayut', icon: Building2 },
      { label: 'Publish to Dubizzle', icon: Home },
      { label: 'Publish to Website', icon: Globe },
    ],
    [
      { label: 'Unpublish from all', icon: SendHorizontal, isUnpublish: true },
      { label: 'Unpublish from PF', icon: Search, isUnpublish: true },
      { label: 'Unpublish from Bayut', icon: Building2, isUnpublish: true },
      { label: 'Unpublish from Dubizzle', icon: Home, isUnpublish: true },
    ],
    [
      { label: 'Archive', icon: Archive },
    ],
    [
      { label: 'Delete', icon: Trash2, isDelete: true },
    ]
  ];

  const menuWidth = 280;
  const menuMargin = 8;

  // Calculate final styles for the menu
  const menuStyles = {
    position: 'fixed',
    width: `${menuWidth}px`,
    zIndex: 10000,
    top: isDropUp ? 'auto' : `${coords.bottom + menuMargin}px`,
    bottom: isDropUp ? `${window.innerHeight - coords.top + menuMargin}px` : 'auto',
    // horizontal alignment with bounds checking
    left: align === 'right'
      ? 'auto'
      : `${Math.min(coords.left, window.innerWidth - menuWidth - 20)}px`,
    right: align === 'right'
      ? `${Math.min(window.innerWidth - coords.right, window.innerWidth - menuWidth - 20)}px`
      : 'auto',
  };

  const menuPortal = (
    <div
      ref={menuRef}
      className={`bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-xl shadow-2xl overflow-hidden py-1 max-h-[450px] overflow-y-auto ring-1 ring-black/5 dark:ring-white/5 no-scrollbar
        ${isDropUp ? 'origin-bottom animate-slide-up' : 'origin-top animate-slide-down'}
        animate-pop-in
      `}
      style={menuStyles}
      onClick={(e) => e.stopPropagation()}
    >
      {menuGroups.map((group, groupIdx) => (
        <React.Fragment key={groupIdx}>
          {groupIdx > 0 && <div className="h-[1px] bg-[#f3efe6] dark:bg-[#1E2530] mx-4 my-1" />}
          <div className="py-1">
            {group.map((item, itemIdx) => (
              <button
                key={itemIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(item.label);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] font-bold transition-colors
                  ${item.isDelete ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10' : 'text-gray-700 dark:text-gray-300 hover:bg-[#fdfaf1] dark:hover:bg-[#1A1F29]'}
                `}
              >
                <div className="w-6 flex justify-center shrink-0">
                  <item.icon size={16} className={`${item.isDelete ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
                </div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </React.Fragment>
      ))}

      {/* Scroll indicator for longer menus */}
      <div className="sticky bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-[#12161F] to-transparent pointer-events-none opacity-50" />
    </div>
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-[3px] px-2.5 py-1.5 rounded-[7px] border border-black/10 bg-transparent cursor-pointer text-[#6b7280] text-[13px] font-semibold hover:bg-gray-50 transition-all font-['DM_Sans',_sans-serif]"
      >
        <MoreVertical size={14} className="flex-shrink-0" />
        <ChevronDown size={10} className="flex-shrink-0" />
      </button>

      {isOpen && ReactDOM.createPortal(menuPortal, document.body)}

      <GenerateBrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        data={{ listingId }}
      />
    </div>
  );
};

export default ActionDropdown;
