import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Smile, ShieldCheck, Heart, Leaf, Star } from 'lucide-react';
import heroImg from '../assets/images/heerang_hero_clean_1781449862496.jpg';
import productImg from '../assets/images/heerang_products_1781448343351.jpg';

interface MainPageProps {
  setActiveTab: (tab: string) => void;
}

export default function MainPage({ setActiveTab }: MainPageProps) {
  return (
    <div className="w-full">
      {/* 1. Hero Dynamic Visual */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Ambient background with genuine generated imagery */}
        <div className="absolute inset-0 bg-black/35 z-10" />
        <img
          src={heroImg}
          alt="희랑 자연 풍경"
          className="absolute inset-0 w-full h-full object-cover scale-102 transform duration-1000"
          referrerPolicy="no-referrer"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 w-full z-20 flex flex-col items-center text-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 text-brand-gold"
          >
            <Sparkles size={13} className="text-gold-bright fill-current" />
            <span className="text-xs uppercase font-semibold text-warm-beige tracking-[0.2em]">
              Premium Natural Wellness
            </span>
          </motion.div>

          {/* Slogan Pairings */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.3] md:leading-[1.4] tracking-tight mb-6"
          >
            건강을 담아,<br className="sm:hidden" /> 기쁨을 나누다
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-2xl font-light leading-relaxed tracking-wide mb-10"
          >
            희랑은 건강한 몸과 행복한 삶을 위한 웰니스 브랜드입니다.<br />
            자연에서 찾은 지혜와 정직한 정성으로 현대인의 지친 식후와 매일의 활력을 되찾아 드립니다.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => setActiveTab('story')}
              className="w-full sm:w-auto px-8 py-4 bg-olive-green text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-lg hover:bg-olive-dark transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>브랜드 소개</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className="w-full sm:w-auto px-8 py-4 bg-white/15 backdrop-blur-md text-white border border-white/40 font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-deep-brown transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <span>제품 보기</span>
            </button>
          </motion.div>
        </div>

        {/* Delicate floating gradient transition to bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-warm-cream to-transparent z-10" />
      </section>

      {/* 2. Brand Value Identity */}
      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-deep-brown font-bold tracking-tight mb-4">
            희랑이 그리는 삶의 조화
          </h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
          <p className="text-sm md:text-base text-deep-brown/70 max-w-xl mx-auto leading-relaxed font-light">
            몸과 마음의 평화는 따로 존재하지 않습니다.<br />
            매일 한 결 편안한 장과 가벼운 소화에서 진정한 기쁨이 시작됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Item 1 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-warm-beige/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-warm-beige rounded-2xl flex items-center justify-center text-olive-green mb-6 shadow-xs">
                <Smile size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-deep-brown mb-3">
                기쁨과 즐거움 : 희(喜)
              </h3>
              <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light">
                건강을 회복하면서 일상 속에서 미소가 살아나고, 맛있는 음식을 기분 좋게 즐길 수 있는 행복을 의미합니다.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-warm-beige/40">
              <span className="text-xs font-serif text-brand-gold tracking-widest font-medium">Happiness & Delight</span>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-warm-beige/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-warm-beige rounded-2xl flex items-center justify-center text-olive-green mb-6 shadow-xs">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-deep-brown mb-3">
                함께하는 사랑 : 랑(랑)
              </h3>
              <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light">
                나 혼자만 아는 건강이 아니라, 사랑하는 이웃, 소중한 가족과 함께 기쁨을 정답게 나누는 온기 있는 사회를 지향합니다.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-warm-beige/40">
              <span className="text-xs font-serif text-brand-gold tracking-widest font-medium">Togetherness & Love</span>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-warm-beige/30 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-warm-beige rounded-2xl flex items-center justify-center text-olive-green mb-6 shadow-xs">
                <Leaf size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-deep-brown mb-3">
                자연의 지혜 : 웰니스
              </h3>
              <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light">
                인위적 정제를 배제하고, 대지에서 자라난 풍부하고 깊은 한방 및 천연 추출 성분들로 몸 속 자생력을 복원합니다.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-warm-beige/40">
              <span className="text-xs font-serif text-brand-gold tracking-widest font-medium">Wisdom of Nature</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Splendid Product Banner Focus */}
      <section className="bg-warm-beige/40 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Illustrated Product mockup container */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl shadow-md border hover:border-brand-gold/50 transition-colors">
            <img
              src={productImg}
              alt="희랑 프리미엄 소화환 변비환"
              className="w-full aspect-[4/3] object-cover hover:scale-105 transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay card tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1.5 px-3 rounded-full text-[10px] sm:text-xs font-bold text-olive-green tracking-widest uppercase border border-warm-beige">
              喜랑 Traditional Formula
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-brand-gold text-xs font-semibold tracking-wider">
              <Sparkles size={14} />
              <span>자연에서 찾은 지혜의 현대적 해석</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown tracking-tight leading-tight">
              매일의 편안한 정돈,<br />희랑의 건강한 포뮬러
            </h2>
            <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light font-sans">
              바쁜 일정 속에 더부룩함이 심한 분들을 위한 **희랑 소화환**, 가스가 차고 불규칙한 배변 상태에 시달리는 직장인을 위한 **희랑 변비환** 두 가지 정교한 한방 시그니처 세트를 소개합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-warm-beige/60">
                <h4 className="font-serif text-base font-bold text-olive-green mb-1.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  <span>희랑 소화환</span>
                </h4>
                <p className="text-xs text-deep-brown/70 font-light leading-relaxed mb-3">
                  식후 더부룩함과 과식의 피로를 순하게 달래는 전통 배합의 위장 평온 보완제.
                </p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs font-medium text-brand-gold hover:text-olive-green flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>상세 보기</span>
                  <ArrowRight size={10} />
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-warm-beige/60">
                <h4 className="font-serif text-base font-bold text-olive-green mb-1.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  <span>희랑 변비환</span>
                </h4>
                <p className="text-xs text-deep-brown/70 font-light leading-relaxed mb-3">
                  불규칙한 장 신호를 정렬하여 원활하고 가벼운 아침을 선물하는 쾌변 서포터.
                </p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs font-medium text-brand-gold hover:text-olive-green flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>상세 보기</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>

            <div className="pt-4 flex">
              <button
                onClick={() => setActiveTab('products')}
                className="px-6 py-3 bg-olive-green text-white text-xs tracking-widest font-bold uppercase rounded-full hover:bg-olive-dark transition-all shadow-sm cursor-pointer"
              >
                전체 제품군 탐색하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Warm Client Feedback Highlight */}
      <section className="py-20 max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <span className="text-xs text-brand-gold tracking-widest font-semibold uppercase font-serif mb-2 block">
              Customer Testimonials
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-deep-brown font-bold tracking-tight">
              실제 고객이 인정한 건강한 변화
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('reviews')}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-white border border-warm-beige text-deep-brown text-xs font-semibold rounded-full hover:bg-warm-beige/25 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>전체 맑은 후기 읽기</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xs border border-warm-beige/30 relative">
            <span className="absolute top-6 right-8 text-brand-gold/20 font-serif text-7xl select-none leading-none">“</span>
            <div className="flex items-center space-x-1 text-gold-bright mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-current" />
              ))}
            </div>
            <h3 className="font-serif text-lg font-bold text-deep-brown mb-2">
              "식후 마다 오던 위장 가스가 드디어 잠잠해요."
            </h3>
            <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light mb-6">
              가벼운 미온수와 함께 한두 개씩 복용하고 있는데, 저녁 식사 후 소화가 완전히 원활해졌습니다. 소화제를 달고 살았었는데 자연주의 한방 희랑 덕에 이제는 주방에서 소화제를 완전 치우게 되었습니다. 진작 구매할걸 후회되네요!
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-deep-brown">소화환 우수 리뷰어 (임은경 님)</span>
              <span className="text-deep-brown/50">재구매 고객</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xs border border-warm-beige/30 relative">
            <span className="absolute top-6 right-8 text-brand-gold/20 font-serif text-7xl select-none leading-none">“</span>
            <div className="flex items-center space-x-1 text-gold-bright mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-current" />
              ))}
            </div>
            <h3 className="font-serif text-lg font-bold text-deep-brown mb-2">
              "매일 가볍고 경쾌한 아침을 누립니다."
            </h3>
            <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light mb-6">
              불규칙하고 힘든 배변 패턴에 만성 가스 차서 얼굴마저 푸석했었어요. 희랑 변비환 먹으니 배가 뒤틀리지도 않으면서 장시간 동안 축적된 피로와 장 노폐물들이 편하게 씻겨 나가는 기법입니다. 앞으로 고정 정기 관리할 예정입니다.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-deep-brown">변비환 우수 리뷰어 (최병화 님)</span>
              <span className="text-deep-brown/50">회사원</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minimalist Campaign Footer Support */}
      <section className="bg-olive-green text-warm-cream py-16 px-5 md:px-10 text-center rounded-t-[3rem] shadow-inner">
        <div className="max-w-3xl mx-auto space-y-6">
          <Smile size={32} className="mx-auto text-brand-gold" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            몸이 가벼워질 때, 비로소 가닿는 웃음의 행복
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-xl mx-auto font-sans">
            정직하고 신뢰도 높은 천연 원료 제조, 수십 년 전통 동양 처방의 웰니스 배합 공학을 한 번에 확인하세요. 지금 구글에 가입하셔서 맑고 고귀한 변화를 체험해 보십시오.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('support')}
              className="px-8 py-3.5 bg-brand-gold text-deep-brown font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-olive-green transition-all shadow-md cursor-pointer"
            >
              1:1 무료 건강 카운슬링 신청하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
