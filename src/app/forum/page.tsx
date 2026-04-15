'use client';

import React, { useState } from 'react';
import { 
  PageWidth, 
  NewTopicModal, 
  ForumHeaderWidget, 
  ForumSidebar, 
  ForumCategoryList,
  MOCK_FORUM_CATEGORIES 
} from '@armoyu/ui';

export default function ForumPage() {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <NewTopicModal 
        isOpen={isNewTopicModalOpen} 
        onClose={() => setIsNewTopicModalOpen(false)} 
      />
      
      {/* 1. Header Alanı */}
      <ForumHeaderWidget onNewTopicClick={() => setIsNewTopicModalOpen(true)} />

      {/* 2. Grid Sistemi - İskelet */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         {/* Main Content */}
         <div className="xl:col-span-3 space-y-16">
            <ForumCategoryList categories={MOCK_FORUM_CATEGORIES} />
         </div>

         {/* Sidebar */}
         <div className="space-y-10 xl:col-span-1">
            <ForumSidebar />
         </div>

      </div>
    </div>
  );
}
