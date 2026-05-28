import { EducationalArticle } from '../types';
import { BookOpen } from 'lucide-react';

interface EducationalArticleCardProps {
  key?: string;
  article: EducationalArticle;
  isSelected: boolean;
  onToggle: () => void;
}

export default function EducationalArticleCard({
  article,
  isSelected,
  onToggle
}: EducationalArticleCardProps) {
  return (
    <div 
      onClick={onToggle}
      className={`bg-white rounded-3xl p-5 border transition-all duration-300 cursor-pointer font-sans ${
        isSelected 
          ? 'border-[#9b0044] ring-2 ring-[#f4dce4] md:col-span-2' 
          : 'border-gray-100 hover:border-[#f4dce4] soft-shadow'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-3 bg-[#fbf9f8] rounded-full text-[#9b0044] shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1 w-full">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-[10px] text-gray-400 font-medium font-sans">
              {article.readTime} lect.
            </span>
          </div>
          <h4 className="font-serif font-bold text-base text-[#1b1c1c] leading-snug">
            {article.title}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed pt-1 font-sans">
            {article.summary}
          </p>

          {isSelected && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in text-xs md:text-sm text-[#594045] font-light leading-relaxed whitespace-pre-line bg-[#fbf9f8]/40 p-3 rounded-2xl font-sans">
              {article.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
