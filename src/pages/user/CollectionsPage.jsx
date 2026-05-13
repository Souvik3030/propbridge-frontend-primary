import React, { useState } from 'react';
import { Folder, ArrowLeft } from 'lucide-react';
import { useCollections } from '../../context/CollectionContext';
import CollectionEmptyState from '../../components/features/collections/CollectionEmptyState';
import CollectionCreateForm from '../../components/features/collections/CollectionCreateForm';
import CollectionCard from '../../components/features/collections/CollectionCard';
import CollectionDetail from '../../components/features/collections/CollectionDetail';

const CollectionsPage = () => {
  const { collections, createCollection, deleteCollection, renameCollection } = useCollections();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState(null);

  const handleCreate = (name) => {
    createCollection(name);
    setShowCreateForm(false);
  };

  const handleRename = (collection) => {
    const newName = prompt('Enter new collection name:', collection.name);
    if (newName && newName.trim()) {
      renameCollection(collection.id, newName.trim());
    }
  };

  const handleShare = (collection) => {
    const shareUrl = `${window.location.origin}/collections/${collection.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share linked copied to clipboard!');
  };

  const activeCollection = collections.find(c => c.id === activeCollectionId);

  if (activeCollectionId && activeCollection) {
    return (
      <div className="py-4">
        <CollectionDetail 
          collection={activeCollection}
          onBack={() => setActiveCollectionId(null)}
          onShare={handleShare}
          onDelete={(id) => {
            deleteCollection(id);
            setActiveCollectionId(null);
          }}
          onRemoveProject={(projectId) => {
            // Implementation for removing project from collection
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ccab59]/10 flex items-center justify-center">
              <Folder size={20} className="text-[#ccab59]" />
            </div>
            <h1 className="text-[32px] font-serif font-bold text-slate-800 dark:text-white leading-tight">
              Collections
            </h1>
          </div>
          <span className="text-[14px] text-slate-400 font-medium ml-[52px]">
            {collections.length} {collections.length === 1 ? 'collection' : 'collections'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {showCreateForm ? (
            <CollectionCreateForm 
              onCreate={handleCreate} 
              onCancel={() => setShowCreateForm(false)} 
            />
          ) : (
            <button 
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-2.5 bg-[#ccab59] text-white rounded-xl font-bold text-[14px] shadow-lg shadow-[#ccab59]/20 hover:scale-[1.02] transition-all"
            >
              + New Collection
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      {collections.length === 0 ? (
        <CollectionEmptyState onCreateClick={() => setShowCreateForm(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {collections.map((collection) => (
            <CollectionCard 
              key={collection.id}
              collection={collection}
              onClick={() => setActiveCollectionId(collection.id)}
              onRename={() => handleRename(collection)}
              onShare={() => handleShare(collection)}
              onDelete={deleteCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
