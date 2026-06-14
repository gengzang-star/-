import { motion } from 'motion/react';
import { Leaf, Award, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export default function BrandStory() {
  const pillars = [
    {
      icon: <Leaf size={24} className="text-olive-green" />,
      title: "엄선된 자연성",
      desc: "대지가 키워낸 순수 생약 원료만을 취합니다. 인공 화학 방부제나 조미료를 일절 첨가하지 않음으로써 몸의 자생력을 자극합니다."
    },
    {
      icon: <Award size={24} className="text-olive-green" />,
      title: "정직한 순수 제법",
      desc: "수 세대 간 내려온 전통 조제법을 고스란히 복원했습니다. 정교하고 일정한 환 입자 건조 공정을 통해 영양 성분 소실을 방어합니다."
    },
    {
      icon: <Heart size={24} className="text-olive-green" />,
      title: "따뜻한 상생과 기쁨",
      desc: "구입 비용의 일부는 복지 사각지대 이웃들의 무료 기부 한약 상자 전달에 기여되어, 함께 건강하고 기쁜 사회를 구축합니다."
    }
  ];

  return (
    <div className="py-24 md:py-32 px-5 md:px-10 max-w-7xl mx-auto">
      {/* 1. Header Hero Story */}
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-3 block"
        >
          Why HEERANG
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-5xl font-bold text-deep-brown tracking-tight leading-tight mb-8"
        >
          건강은 행복의 시작입니다
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-[2px] bg-brand-gold mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm md:text-base text-deep-brown/80 font-light leading-relaxed max-w-2xl mx-auto"
        >
          희랑은 자연에서 얻은 건강한 원료와 정직한 제조 과정을 통해 고객의 건강한 일상을 응원하는 프리미엄 웰니스 브랜드입니다.
        </motion.p>
      </div>

      {/* 2. Visual Slogan Block */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 md:mb-32">
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-olive-green/10 to-transparent -m-4 rounded-3xl" />
          <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-warm-beige/40 relative z-10 text-center md:text-left space-y-6">
            <Leaf size={36} className="text-brand-gold mx-auto md:mx-0" />
            <blockquote className="font-serif text-xl md:text-2xl text-deep-brown font-semibold leading-relaxed">
              “몸이 편안하면 마음이 가벼워지고,<br />
              마음이 가벼워지면 삶이 즐거워집니다.”
            </blockquote>
            <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light">
              진정한 삶의 웰빙은 인공적인 강압에 의해 일시적으로 좋아지는 것보다 몸속 소화 전반과 정리가 자연스럽게 정돈될 때 이루어집니다. 희랑은 그 지혜로운 근본 해결에 함께 머무는 따뜻한 존재가 되고자 합니다.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs text-brand-gold tracking-widest font-bold font-serif uppercase">
            Our Brand Mission
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-brown tracking-tight">
            희랑은 건강과 행복이<br />함께하는 일상을 만들어 갑니다
          </h3>
          <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light font-sans">
            희랑은 건강 지향을 통해 가족의 일상 공간에 상쾌한 미소를 선물합니다. 엄선된 둥글고 정성 어린 환 형태의 제품은 들고 다니기 가볍고 물 한 모금과 함께 언제 어디서든 간편하게 몸을 지킬 수 있습니다.
          </p>
          <div className="flex items-center space-x-3 text-olive-green font-semibold text-xs sm:text-sm bg-warm-beige/40 p-4 rounded-2xl border border-warm-beige/60">
            <ShieldCheck size={20} className="text-olive-green flex-shrink-0" />
            <span>KFDA 인증 완료 및 징크가 함유된 천연 한방 배합 안심 보전 정책</span>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars of Heerang */}
      <section className="bg-warm-beige/25 py-16 px-6 md:px-12 rounded-3xl mb-12 sm:mb-20">
        <div className="text-center mb-12">
          <p className="text-xs text-brand-gold tracking-widest font-bold uppercase font-serif mb-2">The Promises</p>
          <h3 className="font-serif text-2xl font-bold text-deep-brown">정직과 신뢰를 위한 희랑의 원칙</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-warm-beige/50 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-warm-cream rounded-full flex items-center justify-center border border-warm-beige">
                {p.icon}
              </div>
              <h4 className="font-serif text-base font-bold text-deep-brown">{p.title}</h4>
              <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light font-sans">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Beautiful Bottom Message */}
      <div className="text-center font-serif py-6">
        <p className="text-brand-gold text-lg italic tracking-widest font-light mb-2">건강을 담아, 기쁨을 나누다.</p>
        <p className="text-xs text-deep-brown/50 tracking-wider">喜랑 HEERANG Premium Herbal Wellness Lab.</p>
      </div>
    </div>
  );
}
