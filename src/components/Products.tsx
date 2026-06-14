import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, AlertCircle, ShoppingBag, Eye, Heart, HelpCircle, X } from 'lucide-react';

interface ProductDetail {
  id: 'digestion' | 'constipation';
  name: string;
  subtitle: string;
  tagline: string;
  desc: string;
  targets: string[];
  features: string[];
  ingredients: string[];
  usage: string;
  storage: string;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  const productsList: ProductDetail[] = [
    {
      id: 'digestion',
      name: '희랑 소화환',
      subtitle: 'Heerang Digestion Formula',
      tagline: '식후 편안함을 위한 탁월한 선택',
      desc: '과식, 잦은 외식, 불규칙한 식사로 인해 속이 늘 더부룩하고 불편함을 느끼는 현대인을 위한 프리미엄 전통 소화 건강 보완제입니다. 몸의 소화 효소와 한방 약재들의 시너지를 극대화하여 장기적인 자생 기관의 휴식을 부여합니다.',
      targets: [
        '평소 식후 더부룩함이나 가스가 자주 차시는 분',
        '잦은 과식과 회식 후 명치 부근의 불편함을 느끼는 분',
        '인위적인 화학 소화제를 줄이고 속을 편히 관리하고 싶은 분',
        '바쁜 일정으로 스트레스성 위장 장애가 있는 직장인과 학생'
      ],
      features: [
        '신선하게 엄선된 국산 전통 한방 원료 배합',
        '목 넘김이 가볍고 휴대가 극히 편리한 소형 스틱 환 형태',
        '하루 한 포 가볍게 물과 함께 섭취하는 실용적인 건강 관리'
      ],
      ingredients: [
        '백출 (Atractylodes): 위장을 튼튼하게 하고 습담을 정돈',
        '산사 (Hawthorn fruit): 단백질과 유분 소화를 강하게 지휘',
        '신곡 (Malt ferment): 복부 팽만 및 식체 정체를 자연스럽게 해결',
        '진피 (Tangerine peel): 기침 가스를 가라앉히고 순환 배출 유도'
      ],
      usage: '식후 30분 이내에 1포를 미온수와 함께 점진적으로 삼켜 섭취하십시오. 증상에 따라 하루 최대 2회까지 복용 가능합니다.',
      storage: '직사광선을 피하고 습기가 적은 서늘한 실온에 밀봉 보존해 주십시오.'
    },
    {
      id: 'constipation',
      name: '희랑 변비환',
      subtitle: 'Heerang Bowel Formula',
      tagline: '편안한 관문과 가벼운 아침을 위한 하루 습관',
      desc: '불규칙한 장운동으로 인해 가스가 차고 화장실 이용이 고통스러운 현대인들을 위해 순하고 효험 있게 배합된 장 건강 서포터입니다. 무리를 가하지 않고 배변 활동을 활성화시켜 체내 무거운 노폐물 배출과 해독을 순항시킵니다.',
      targets: [
        '배변 활동이 불규칙하거나 쾌변 만족감이 부족하신 분',
        '오랜 잔변감 및 만성적인 장부 더부룩함에 시달리는 분',
        '자연 생약 성분을 통해 장기적이고 영양 깊은 개선 습관을 시작하려는 분',
        '장시간 모니터 앞에 앉아 생활하여 활동량이 상대적으로 떨어지는 사무직 근로자'
      ],
      features: [
        '장 벽을 순하게 세척하는 전통 원료 기반 오리지널 시그니처 비율',
        '체내 가스 및 유해 노폐물의 정량적 흡착 배출 촉진',
        '지속적인 자극 내성 걱정이 없는 올리브 순수 생약 구성 고집'
      ],
      ingredients: [
        '알로에 아보레센스 (Aloe): 배변의 점액 분비 및 물리적 윤활 유도',
        '차전자피 (Psyllium husk): 수분을 강력히 흡수 팽창해 부드러운 배출 도모',
        '맥문동 (Ophiopogon): 건조해진 장 장기를 한 결 부드럽고 윤택하게 영양 보완',
        '어성초 (Houttuynia): 장 속 유해 미생물의 염증 억제와 청정 장내 보정'
      ],
      usage: '취침 전 또는 공복에 미온수 250ml 이상의 넉넉한 물 한 컵과 함께 1포를 복용해 주십시오. 체내 수분이 충분해야 장 팽창 배설이 수월해집니다.',
      storage: '개별 포장이므로 실온에 온전하게 보존이 가능하며, 가습기 주변이나 고온 환경을 멀리해 주십시오.'
    }
  ];

  return (
    <div className="py-24 md:py-32 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Product Hub Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <span className="text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-2 block">
          HEERANG FORMULA
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown tracking-tight mb-4">
          식후와 매일 아침의 기적적인 변화
        </h2>
        <div className="w-12 h-[2px] bg-brand-gold mx-auto mb-6" />
        <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light">
          희랑의 모든 환류는 단순 과장에 기대지 않습니다. 수 세기 고유 가치가 보장된 전통 생약 성분 배합 노하우를 정립하여, 자극적 합성 성분 없이 근본적인 편안함을 구축하는 데 전력을 쏟습니다.
        </p>
      </div>

      {/* Main Double Product Block Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {productsList.map((product) => {
          const isDigestion = product.id === 'digestion';
          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-warm-beige/45 flex flex-col justify-between hover:border-brand-gold transition-colors duration-500 overflow-hidden relative group"
            >
              {/* Product background pattern badge */}
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 select-none text-[8rem] font-serif font-bold text-warm-beige/30 group-hover:text-warm-beige/65 group-hover:scale-105 transform duration-700 pointer-events-none">
                {isDigestion ? '喜' : '潔'}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  {/* Category marker */}
                  <span className="inline-flex items-center space-x-1.5 bg-warm-beige text-olive-green text-[11px] font-bold py-1 px-3.5 rounded-full border border-warm-beige">
                    <Sparkles size={11} className="text-brand-gold" />
                    <span>Traditional Spec</span>
                  </span>
                  <span className="text-xs font-serif text-brand-gold tracking-widest uppercase">
                    {isDigestion ? 'Digest' : 'Cleanse'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deep-brown">
                    {product.name}
                  </h3>
                  <p className="font-serif text-xs text-brand-gold tracking-wider">{product.subtitle}</p>
                </div>

                <hr className="border-t border-warm-beige" />

                <p className="text-xs sm:text-sm text-olive-light font-medium tracking-tight">
                  "{product.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light">
                  {product.desc}
                </p>

                {/* Bullets feature preview */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-deep-brown tracking-wider">제품 핵심 특징</p>
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs">
                      <div className="w-4 h-4 bg-olive-green/10 rounded-full flex items-center justify-center text-olive-green flex-shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="text-deep-brown/80 font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction Details button */}
              <div className="pt-10 flex items-center space-x-3 w-full relative z-20">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-3.5 bg-olive-green text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-sm hover:bg-olive-dark transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>복용 가이드 및 성분 정보</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Exquisite Light Overlapping Dialog Drawer Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-deep-brown/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Core Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-warm-cream w-full max-w-2xl rounded-[2.5rem] border border-brand-gold/20 shadow-2xl p-6 sm:p-10 relative z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 text-deep-brown/60 hover:text-deep-brown focus:outline-none transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] sm:text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-1 block">
                    {selectedProduct.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deep-brown">
                    {selectedProduct.name}
                  </h3>
                </div>

                <div className="p-4 bg-white/70 border border-warm-beige rounded-2xl">
                  <p className="text-xs text-olive-green italic font-medium">"{selectedProduct.tagline}"</p>
                  <p className="text-xs text-deep-brown/70 mt-1 font-light leading-relaxed">{selectedProduct.desc}</p>
                </div>

                {/* Recommendation checklists */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-deep-brown tracking-wider">이런 분들께 권유드립니다 (추천 대상)</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProduct.targets.map((t, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs text-deep-brown/80">
                        <span className="text-brand-gold font-bold flex-shrink-0">•</span>
                        <span className="font-light leading-relaxed">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Traditional Ingredients list */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-deep-brown tracking-wider text-olive-green">전통 조제 처방 및 핵심 재료</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <div key={i} className="bg-white px-4 py-3 rounded-xl border border-warm-beige flex items-center justify-between text-[11px] sm:text-xs">
                        <span className="text-deep-brown font-medium">{ing.split(':')[0]}</span>
                        <span className="text-deep-brown/65 font-light">{ing.split(':')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-t border-warm-beige" />

                {/* Guidelines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
                  <div>
                    <h5 className="font-semibold text-deep-brown mb-1.5 flex items-center space-x-1">
                      <Sparkles size={12} className="text-brand-gold" />
                      <span>복용 가이드 안내</span>
                    </h5>
                    <p className="text-deep-brown/75 leading-relaxed font-light">{selectedProduct.usage}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-deep-brown mb-1.5 flex items-center space-x-1">
                      <AlertCircle size={12} className="text-olive-green" />
                      <span>안심 보관 기준</span>
                    </h5>
                    <p className="text-deep-brown/75 leading-relaxed font-light">{selectedProduct.storage}</p>
                  </div>
                </div>

                <div className="pt-4 flex">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full py-3.5 bg-deep-brown text-white text-xs font-bold tracking-widest uppercase rounded-2xl hover:bg-black transition-colors cursor-pointer"
                  >
                    내용 확인 완료 (닫기)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
