import { Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-brown text-warm-beige pt-16 pb-8 px-5 md:px-10 border-t border-brand-gold/15">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-warm-beige/10">
        {/* Brand identity column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center font-serif text-deep-brown font-bold text-sm">
              喜
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-warm-beige">
              희랑 <span className="text-[9px] text-brand-gold font-sans font-normal ml-0.5">HEERANG</span>
            </span>
          </div>

          <p className="text-xs text-warm-beige/70 leading-relaxed font-light max-w-sm">
            희랑(喜랑)은 기쁨(喜)을 사랑하는 사람과 따뜻하게 함께하는 공간입니다. 동양 전통의 자연 보전 원료의 과학적 규명과 정량 연구를 지휘해 100년 위장의 완벽한 편안함을 완성하겠습니다.
          </p>

          <p className="text-[10px] text-brand-gold italic">
            "건강을 담아, 기쁨을 나누다"
          </p>
        </div>

        {/* Quick Menu shortcuts columns */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-serif text-sm font-bold text-warm-beige">맑은 도정 바로가기</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-warm-beige/65">
            <button
              onClick={() => setActiveTab('home')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              메인 홈
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              브랜드 스토리
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              제품 소개
            </button>
            <button
              onClick={() => setActiveTab('contents')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              희랑 서재 이야기
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              고객 실제 후기
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className="text-left hover:text-brand-gold transition-colors cursor-pointer"
            >
              고객 소통 센터
            </button>
          </div>
        </div>

        {/* Contact list info */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="font-serif text-sm font-bold text-warm-beige">희랑 웰니스 연합 본소</h4>
          <div className="text-xs text-warm-beige/60 space-y-1.5 font-light">
            <p>상호명 : 희랑 주식회사 | 대표자 : 최희랑</p>
            <p>소재지 : 서울특별시 강남구 자연로 喜 (동의한방타워 7F)</p>
            <p>사업자등록번호 : 120-88-09124 | 정밀 통신판매업신고 필함</p>
            <p>전화상담 : 1544-0987 | 이메일 : cs@heerangwellness.com</p>
          </div>
        </div>
      </div>

      {/* Trademark copyright bottom logs */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-warm-beige/45 gap-4">
        <p>Copyright © {currentYear} 주식회사 희랑 All rights reserved. Registered Trademark.</p>
        
        <div className="flex items-center space-x-1">
          <span>Crafted for exquisite life with</span>
          <Heart size={10} className="text-brand-gold fill-brand-gold" />
          <span>Heerang Nature Core.</span>
        </div>
      </div>
    </footer>
  );
}
