import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, HelpCircle, Mail, RotateCcw, Truck, MessageSquare, ShieldCheck, ChevronDown, CheckCircle } from 'lucide-react';
import { getCurrentlyLoggedUser, fetchInquiries, addInquiry, IS_MOCK_MODE, HeerangSessionUser } from '../firebase';
import { HeerangInquiry, InquiryCategory } from '../types';

export default function CustomerCenter() {
  const [currentUser, setCurrentUser] = useState<HeerangSessionUser | null>(null);
  const [inquiriesList, setInquiriesList] = useState<HeerangInquiry[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form parameters
  const [formInput, setFormInput] = useState({
    category: '소화환' as InquiryCategory,
    email: '',
    title: '',
    content: ''
  });

  // Accordion FAQ states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const loadUserInquiries = async (uid: string) => {
    const list = await fetchInquiries(uid);
    setInquiriesList(list);
  };

  useEffect(() => {
    const user = getCurrentlyLoggedUser();
    setCurrentUser(user);
    if (user) {
      loadUserInquiries(user.uid);
      setFormInput(prev => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('1:1 문의를 작성하려면 먼저 비밀번호나 토큰 로그인 처리가 완료되어야 합니다.');
      return;
    }

    if (!formInput.title.trim() || !formInput.content.trim()) {
      alert('제목과 문의 내용을 정직하게 채워 주십시오.');
      return;
    }

    setSubmitting(true);
    try {
      await addInquiry({
        userId: currentUser.uid,
        userName: currentUser.displayName,
        email: formInput.email,
        category: formInput.category,
        title: formInput.title,
        content: formInput.content,
        createdAt: new Date().toISOString()
      });

      // Reset form parameters
      setFormInput({
        category: '소화환',
        email: currentUser.email,
        title: '',
        content: ''
      });
      setShowInquiryForm(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);

      // Re-load Inquiries List
      await loadUserInquiries(currentUser.uid);
    } catch (err) {
      console.error(err);
      alert('문의 내용 작성 저장에 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "희랑 소화환 과 변비환 복합 복용이 가능한가요?",
      a: "네, 두 제품 모두 자연주의 생약 기반 한반 보완 배합으로 기획되어 동시 복용하셔도 신체 부담이 지극히 적습니다. 가급적 소화환은 식사 뒤 30분 이내에, 변비환은 주무시기 전 공복 상태에 시원한 미온수 한 잔과 함께 복용해 시너지를 도모해 보십시오."
    },
    {
      q: "임산부, 수유부 또는 어린이가 복용해도 안전한가요?",
      a: "희랑의 전 성분은 중금속 및 잔류농약 정밀 검사 기준을 100% 통과한 고안전 안심 한약재로 구성되어 있습니다. 다만 호르몬 성질이 다소 민감한 임산부 및 삼키는 기능이 미성숙한 10세 미만 영유아의 경우 복용 전 본인의 단골 산부인과/소아과 전문의와 세부 상담을 먼저 구하시길 권유 드립니다."
    },
    {
      q: "정기 섭취 시 권위 수량이 어떻게 됩니까?",
      a: "기본적인 일상 소화 관리에는 하루 1포(식후)만을 권해 흐름을 보존하며, 갑작스럽게 더부룩하거나 체기가 있는 긴급한 상황에는 즉시 1포를 간편하게 섭취하십시오. 변비환의 경우 가벼운 배변 감도를 찾기 위해서 연속 2주간 매 저녁 공복 1포씩을 정량 유지하시는 것이 최상의 아침 평온감을 부릅니다."
    },
    {
      q: "배송은 며칠 정도 기일이 적용되나요?",
      a: "당일 오후 2시 이전 결제 완료 건은 특별 관서 보전 포장을 거쳐 우체국 택배로 당일 칼출고되며 전국 익일 도래 수령을 원칙으로 삼습니다. (주말/공휴일 제외 평균 1~3일 이내에 도달 완료)"
    },
    {
      q: "교환 및 환불 승인은 어떻게 진행됩니까?",
      a: "포장 패키지가 훼손되지 않은 배송 완료일 기준 7일 이내의 미개봉 정품 박스에 관하여 전액 100% 왕복 환불 및 부하 제어 교환을 허가하여 드립니다. 개별 스틱 파우치를 뜯어 섭취하신 분은 환불 심사가 곤란할 수 있습니다."
    }
  ];

  return (
    <div className="py-24 md:py-32 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Customer Hub Header */}
      <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
        <span className="text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-2 block">
          CUSTOMER SERENE CENTER
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown tracking-tight mb-4">
          따뜻한 연결이 머무는 소통실
        </h2>
        <div className="w-12 h-[2px] bg-brand-gold mx-auto mb-6" />
        <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light font-sans">
          희랑은 고객 만족을 절대 우선 가치로 봉직합니다. 궁금한 건강 한방 질문, 제품 복용 가이드, 주문 배송 문의 등을 친절히 전개해 응답하겠습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column: Quick Contacts and policies details */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-serif text-xl font-bold text-deep-brown">간편 상담 정보</h3>
          
          {/* Quick contact Card */}
          <div className="bg-white p-6 rounded-3xl border border-warm-beige shadow-xs space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-warm-beige rounded-xl flex items-center justify-center text-olive-green flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] text-deep-brown/50 tracking-wider">유선 전화 긴급 문의</span>
                <p className="text-base font-bold text-deep-brown tracking-wide mt-0.5">1544-0987</p>
                <p className="text-[10px] text-deep-brown/60 leading-relaxed">평일 10:00 - 17:00 (점심 12시-13시)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 pt-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-800 flex-shrink-0">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-deep-brown/50 tracking-wider">카카오톡 플친 대기 상담</span>
                <p className="text-xs font-semibold text-deep-brown mt-0.5">@희랑 웰니스 공식</p>
                <button
                  onClick={() => alert('카카오톡 채널 상담 준비 단계입니다. 고객센터 1:1 온라인 문의를 이용해 주시면 신속히 문자로 답신을 올리겠습니다!')}
                  className="mt-2 text-[10px] text-white bg-yellow-600 px-3.5 py-1.5 rounded-lg hover:bg-yellow-700 transition-all font-semibold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                >
                  <span>카카오톡 상담하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* Delivery & Exchange cards */}
          <div className="bg-warm-beige/25 p-6 rounded-3xl border border-warm-beige/50 space-y-4 text-xs font-sans">
            <h4 className="font-serif text-sm font-bold text-deep-brown">기본 이용 약정 안내</h4>
            
            <div className="flex items-start space-x-3.5 text-deep-brown/85">
              <Truck size={16} className="text-olive-green mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-deep-brown">안심 안보 배송</span>
                <p className="text-[11px] text-deep-brown/70 leading-relaxed mt-0.5">
                  도서 산간 제외 무료 선출고를 진행 중이며 5만 원 이상 신청 시 전액 완전 배송 보전 지원됩니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-deep-brown/85 pt-1">
              <RotateCcw size={16} className="text-olive-green mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-deep-brown">교환 및 전액 보상 기법</span>
                <p className="text-[11px] text-deep-brown/70 leading-relaxed mt-0.5">
                  안전 파손 시 미개봉 7일 한도로 즉시 우체국 택배 수거 및 책임 맞교환 배필해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: FAQ with dynamic Inquiry Logs persistence */}
        <div className="lg:col-span-8 space-y-8">
          {/* FAQ Segment accordion */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-deep-brown flex items-center space-x-2">
              <HelpCircle size={20} className="text-brand-gold" />
              <span>자주 묻는 질문 (FAQ)</span>
            </h3>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-warm-beige/35 overflow-hidden transition-all shadow-2xs">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-deep-brown hover:text-olive-green transition-colors cursor-pointer"
                    >
                      <span className="flex items-center space-x-2.5">
                        <span className="text-brand-gold font-serif">Q.</span>
                        <span className="leading-snug">{faq.q}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-brand-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden bg-warm-cream/40 border-t border-warm-beige/25"
                        >
                          <div className="p-5 text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light whitespace-pre-wrap">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1:1 Support Consultations form persistence logs */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-deep-brown flex items-center space-x-2">
                <MessageSquare size={20} className="text-olive-green" />
                <span>나의 1:1 상담 기록 목록</span>
              </h3>

              <button
                onClick={() => {
                  if (!currentUser) {
                    alert('문의 작성을 하려면 먼저 로그인 상태 가 갖춰져야 합니다. 상위 회원가입 버튼을 이용해 주십시오.');
                    return;
                  }
                  setShowInquiryForm(!showInquiryForm);
                }}
                className="px-4 py-2 bg-deep-brown hover:bg-black text-white text-[11px] font-semibold rounded-full shadow-sm cursor-pointer"
              >
                {showInquiryForm ? '상담란 닫기' : '새로운 온라인 상담 등록'}
              </button>
            </div>

            {/* Expandable Inquiry Form */}
            <AnimatePresence>
              {showInquiryForm && currentUser && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-[2rem] border border-brand-gold/30 p-6 sm:p-8 space-y-4 shadow-md overflow-hidden"
                >
                  <h4 className="font-serif text-sm font-semibold text-deep-brown flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>희랑 1:1 건강 위탁 및 주문 맑은 답변 요청</span>
                  </h4>

                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Select Category */}
                      <div className="space-y-1">
                        <label className="font-semibold text-deep-brown/80">질문 답변 분류 분류</label>
                        <select
                          value={formInput.category}
                          onChange={(e) => setFormInput(p => ({ ...p, category: e.target.value as InquiryCategory }))}
                          className="w-full px-4 py-2.5 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold"
                        >
                          <option value="소화환">희랑 소화환 관련</option>
                          <option value="변비환">희랑 변비환 관련</option>
                          <option value="배송 및 교환">우체국 배송 및 안심 교환 문의</option>
                          <option value="기타">기타 이웃 건강 상담</option>
                        </select>
                      </div>

                      {/* Display Alert Email */}
                      <div className="space-y-1">
                        <label className="font-semibold text-deep-brown/80">답신 알림 이메일 주소</label>
                        <input
                          type="email"
                          required
                          value={formInput.email}
                          onChange={(e) => setFormInput(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold"
                        />
                      </div>
                    </div>

                    {/* Inquiry Title */}
                    <div className="space-y-1">
                      <label className="font-semibold text-deep-brown/80">상담 요약 제목</label>
                      <input
                        type="text"
                        required
                        maxLength={150}
                        placeholder="예: 복용 전 한방 진피 성분 알러지 유해성 사전 점검을 구합니다."
                        value={formInput.title}
                        onChange={(e) => setFormInput(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold placeholder-deep-brown/45"
                      />
                    </div>

                    {/* Inquiry detail body */}
                    <div className="space-y-1">
                      <label className="font-semibold text-deep-brown/80">질문 상세 내용 및 희망 요청안</label>
                      <textarea
                        rows={5}
                        required
                        maxLength={2000}
                        placeholder="주문 번호 또는 체질 질환 상태와 함께 문의 주시면 한의학 수석 자문을 토대로 맑고 정직한 답신을 24시간 내 이메일 통보해 드리겠습니다."
                        value={formInput.content}
                        onChange={(e) => setFormInput(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full px-4 py-3 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold placeholder-deep-brown/45 leading-relaxed font-light"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="px-4 py-2 bg-warm-beige hover:bg-warm-beige/75 text-deep-brown font-semibold rounded-xl cursor-pointer"
                      >
                        취소하기
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-olive-green text-white font-bold uppercase tracking-widest rounded-xl hover:bg-olive-dark shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? '신청서 등록 중...' : '1:1 건강 카운슬링 신청'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List entries of security personal inquiries */}
            {currentUser ? (
              inquiriesList.length > 0 ? (
                <div className="space-y-3.5">
                  {inquiriesList.map((inq) => (
                    <div key={inq.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-warm-beige/55 shadow-2xs space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between text-[10px] text-deep-brown/50">
                        <span className="font-bold text-olive-green px-2 py-0.5 rounded-md bg-olive-green/5 border border-olive-green/15 uppercase font-serif tracking-wider">
                          [{inq.category}]
                        </span>
                        <span>{new Date(inq.createdAt).toLocaleString('ko-KR')}</span>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-deep-brown tracking-tight">
                        {inq.title}
                      </h4>

                      <p className="text-xs text-deep-brown/70 leading-relaxed font-light whitespace-pre-wrap">
                        {inq.content}
                      </p>

                      <hr className="border-t border-warm-beige/50" />

                      {/* Official response placeholder */}
                      <div className="bg-warm-beige/30 p-4 rounded-xl border border-warm-beige flex items-start space-x-3 text-xs leading-relaxed text-deep-brown">
                        <ShieldCheck size={16} className="text-olive-green mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-olive-green">[희랑 한방 자문실 공식 답변]</span>
                            <span className="text-[10px] text-deep-brown/40">답변 대기/자동 수집 승인됨</span>
                          </div>
                          <p className="text-[11px] text-deep-brown/70 leading-relaxed font-light">
                            문의에 깊이 감사올립니다. 기재해주신 상세 체질 및 답신 요청 데이터들이 한의학 위원실 에 정상 전달되었습니다. 담당 전문의가 면밀히 가필하여 24시간 내에 {inq.email} 주소로 친절하고 온전한 평온 맞춤 상담 답신을 전해 올립니다. 편안한 위장 일상을 기원합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14 bg-white/40 rounded-2xl border border-warm-beige/40 max-w-sm mx-auto p-6 space-y-2">
                  <Mail size={22} className="text-brand-gold/60 mx-auto" />
                  <p className="text-xs text-deep-brown font-semibold leading-relaxed">접수된 나의 1:1 상담 역사 기록이 없습니다</p>
                  <p className="text-[11px] text-deep-brown/50 font-light leading-relaxed">식후 더부룩함 원인 등 궁금한 증상을 기입해 1:1 건강 카운슬실에 첫 질문을 등록해 보십시오!</p>
                </div>
              )
            ) : (
              <div className="bg-white/80 p-8 rounded-3xl border border-warm-beige text-center space-y-4 max-w-md mx-auto py-12">
                <ShieldCheck size={30} className="text-brand-gold mx-auto" />
                <h4 className="font-serif text-sm font-bold text-deep-brown">안심 개인정보 보호 가드 로그인 보증</h4>
                <p className="text-[11px] sm:text-xs text-deep-brown/65 leading-relaxed font-light">
                  1:1 문의 및 답변 데이터는 외부 무단 크레이퍼 수집 해킹 시도로부터의 철저한 격리를 선언하고 있습니다. 오로지 본인만이 1:1 상담 카드를 조회할 수 있으니 우측 상단의 **구글 로그인**을 거쳐 안심 관리해 주시기 바랍니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Success Alert */}
      <AnimatePresence>
        {successToast && (
          <div className="fixed bottom-6 left-6 bg-olive-green text-white py-3.5 px-6 rounded-2xl shadow-xl z-50 flex items-center space-x-3 border border-warm-beige/30">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white">
              <CheckCircle size={14} />
            </div>
            <p className="text-xs sm:text-sm font-semibold">1:1 한방 웰니스 자문 요청이 정상적으로 영구 승인 등록되었습니다!</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
