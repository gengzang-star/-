import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquarePlus, Trash2, ShieldCheck, Heart, User, CheckCircle } from 'lucide-react';
import { getCurrentlyLoggedUser, fetchReviews, addReview, deleteReview, IS_MOCK_MODE, HeerangSessionUser } from '../firebase';
import { HeerangReview, ProductId } from '../types';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<HeerangReview[]>([]);
  const [currentUser, setCurrentUser] = useState<HeerangSessionUser | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [productFilter, setProductFilter] = useState<ProductId | 'all'>('all');

  // Review Form States
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: 'digestion' as ProductId,
    rating: 5,
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const loadData = async () => {
    const list = await fetchReviews();
    setReviews(list);
    const user = getCurrentlyLoggedUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    loadData();
    // Listening to state to capture immediate user actions or logins
    const handleAuthChange = () => {
      setCurrentUser(getCurrentlyLoggedUser());
    };
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('후기를 작성하려면 상단에서 먼저 로그인해 주셔야 합니다.');
      return;
    }

    if (!formData.title.trim()) {
      alert('후기 제목을 작성해 주세요.');
      return;
    }

    if (!formData.content.trim() || formData.content.trim().length < 10) {
      alert('후기 상세 내용을 최소 10글자 이상 작성해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview({
        userId: currentUser.uid,
        userName: currentUser.displayName,
        productId: formData.productId,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        createdAt: new Date().toISOString()
      });

      // Clear states
      setFormData({
        productId: 'digestion',
        rating: 5,
        title: '',
        content: ''
      });
      setShowForm(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);

      // Re-load reviews lists
      await loadData();
    } catch (error) {
      console.error(error);
      alert('후기 전송에 실패했습니다. 형식 또는 인증 상태를 점검해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('이 후기를 정말 삭제하시겠습니까?')) {
      try {
        await deleteReview(id);
        await loadData();
      } catch (e) {
        console.error(e);
        alert('삭제 권한이 없거나 오류가 발생했습니다.');
      }
    }
  };

  // Overall calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const productReviewCount = (prodId: ProductId) => reviews.filter(r => r.productId === prodId).length;

  const filteredReviews = reviews.filter(rev => {
    const matchesRating = ratingFilter === 'all' || rev.rating === ratingFilter;
    const matchesProduct = productFilter === 'all' || rev.productId === productFilter;
    return matchesRating && matchesProduct;
  });

  return (
    <div className="py-24 md:py-32 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Community Review Header */}
      <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
        <span className="text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-2 block">
          CUSTOMER JOURNEY
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown tracking-tight mb-4">
          건강을 나누는 기쁨의 맑은 메아리
        </h2>
        <div className="w-12 h-[2px] bg-brand-gold mx-auto mb-6" />
        <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light">
          희랑 소화환 및 변비환을 통해 속 편한 일상을 찾은 실제 고객들의 꾸밈없는 정성과 기쁨의 목소리를 확인하세요. 후기는 언제든 작성해 지속 공유할 수 있습니다.
        </p>
      </div>

      {/* Stats Dash Cards Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Score Panel */}
        <div className="bg-white p-7 rounded-[2rem] border border-warm-beige shadow-xs flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-xs text-deep-brown/60 uppercase tracking-widest font-semibold">고객 전반 만족도</span>
          <div className="flex items-baseline space-x-1.5 pt-1">
            <span className="text-4xl font-serif font-black text-deep-brown">{averageRating}</span>
            <span className="text-sm font-semibold text-deep-brown/50">/ 5.0</span>
          </div>
          <div className="flex items-center space-x-1 text-gold-bright">
            {[...Array(5)].map((_, idx) => {
              const numScore = Math.round(Number(averageRating));
              return (
                <Star
                  key={idx}
                  size={15}
                  className={idx < numScore ? 'fill-current' : 'text-warm-beige'}
                />
              );
            })}
          </div>
        </div>

        {/* Product Digest Review Stats */}
        <div className="bg-white p-7 rounded-[2rem] border border-warm-beige shadow-xs flex flex-col justify-center space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-deep-brown">희랑 소화환</span>
            <span className="font-semibold text-brand-gold">{productReviewCount('digestion')} 건 등록</span>
          </div>
          <div className="w-full bg-warm-cream h-2 rounded-full overflow-hidden">
            <div
              className="bg-olive-green h-full rounded-full transition-all duration-500"
              style={{ width: `${totalReviews > 0 ? (productReviewCount('digestion') / totalReviews) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[10px] text-deep-brown/50 leading-relaxed">식후 위 가스 팽창 및 소화 억제 상태 극복 후기 밀집군</p>
        </div>

        {/* Product Bowel Stats */}
        <div className="bg-white p-7 rounded-[2rem] border border-warm-beige shadow-xs flex flex-col justify-center space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-deep-brown">희랑 변비환</span>
            <span className="font-semibold text-brand-gold">{productReviewCount('constipation')} 건 등록</span>
          </div>
          <div className="w-full bg-warm-cream h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${totalReviews > 0 ? (productReviewCount('constipation') / totalReviews) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[10px] text-deep-brown/50 leading-relaxed">아침 개운한 쾌변 배출 및 변비 증상 자가 정돈 완결군</p>
        </div>
      </div>

      {/* Control Filter Bar & Form Action Toggler */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white/70 p-4 rounded-3xl border border-warm-beige/55">
        <div className="flex flex-wrap items-center gap-3">
          {/* Select filter by product */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-deep-brown/60 whitespace-nowrap">제품군:</span>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value as ProductId | 'all')}
              className="px-3.5 py-1.5 bg-warm-cream rounded-xl text-xs text-deep-brown border border-warm-beige/30 focus:outline-none focus:border-brand-gold"
            >
              <option value="all">전체 제품 목록</option>
              <option value="digestion">희랑 소화환 만</option>
              <option value="constipation">희랑 변비환 만</option>
            </select>
          </div>

          {/* Select filter by Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-deep-brown/60 whitespace-nowrap">별점:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-3.5 py-1.5 bg-warm-cream rounded-xl text-xs text-deep-brown border border-warm-beige/30 focus:outline-none focus:border-brand-gold"
            >
              <option value="all">전체 별점 점수</option>
              <option value="5">★★★★★ (5점)</option>
              <option value="4">★★★★☆ (4점)</option>
              <option value="3">★★★☆☆ (3점)</option>
            </select>
          </div>
        </div>

        {/* Action Toggle Form */}
        <button
          onClick={() => {
            if (!currentUser) {
              alert('리뷰를 작성하려면 먼저 로그인해 주십시오. 상단 우측 [로그인] 버튼을 클릭하면 체험용 가상 계정으로 쉽게 로그인할 수 있습니다!');
              return;
            }
            setShowForm(!showForm);
          }}
          className="px-5 py-2.5 bg-olive-green text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-olive-dark shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <MessageSquarePlus size={14} />
          <span>나의 맑은 변화 후기 남기기</span>
        </button>
      </div>

      {/* Expandable Review submission form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/95 rounded-[2rem] border border-brand-gold/25 p-6 sm:p-8 mb-10 shadow-md space-y-5"
          >
            <h3 className="font-serif text-lg font-bold text-deep-brown flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span>희랑과 기쁨 나누기: 후기 작성란</span>
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SELECT product target link */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep-brown/80 block">대상 복용 제품군</label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value as ProductId }))}
                    className="w-full px-4 py-2.5 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold"
                  >
                    <option value="digestion">희랑 소화환 (식후 평온제)</option>
                    <option value="constipation">희랑 변비환 (쾌변 보완제)</option>
                  </select>
                </div>

                {/* Stars select box */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep-brown/80 block">개인 만족도 점수</label>
                  <div className="flex items-center space-x-1.5 h-10 px-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="text-gold-bright hover:scale-110 transform duration-200 cursor-pointer"
                      >
                        <Star
                          size={22}
                          className={star <= formData.rating ? 'fill-current' : 'text-warm-beige'}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-deep-brown/60 ml-2">({formData.rating}점 만족!)</span>
                  </div>
                </div>
              </div>

              {/* Review Title Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-deep-brown/80 block">한 줄 요약 제목</label>
                <input
                  type="text"
                  maxLength={80}
                  placeholder="예: 과식 후 더부룩하던 위장이 싹 편안해져서 잠을 잘 잡니다."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold placeholder-deep-brown/40"
                />
              </div>

              {/* Review Text Area */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-deep-brown/80 block">솔직한 체험 후기 상세 (최소 10자 이상)</label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="가족이나 이웃들에게 이 자연 한방 제품이 미친 솔직하고 정적인 건강 변화와 느낌을 상세히 전개해 주시면 아주 감사하겠습니다."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-warm-cream border border-warm-beige rounded-xl text-xs text-deep-brown focus:outline-none focus:border-brand-gold placeholder-deep-brown/40 font-light"
                />
              </div>

              {/* Buttons panel */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-warm-beige text-deep-brown text-xs font-semibold rounded-xl hover:bg-warm-beige/75 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-olive-green text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-olive-dark shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? '저장 등록 중...' : '솔직한 후기 등록하기'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews items lists */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.map((rev) => {
            const isOwner = currentUser && (currentUser.uid === rev.userId);
            return (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 sm:p-8 rounded-[2rem] border border-warm-beige/35 shadow-xs relative flex flex-col md:flex-row gap-6 md:gap-10 hover:border-brand-gold/30 transition-all"
              >
                {/* Score rating column */}
                <div className="md:w-36 flex-shrink-0 flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-warm-beige/40 pb-4 md:pb-0">
                  <div className="flex items-center space-x-0.5 text-gold-bright">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={13}
                        className={idx < rev.rating ? 'fill-current' : 'text-warm-beige'}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold font-serif">
                    {rev.productId === 'digestion' ? '희랑 소화환' : '희랑 변비환'}
                  </span>

                  <div className="flex items-center space-x-1 pt-1 text-[11px] text-deep-brown/60">
                    <User size={11} className="text-deep-brown/40" />
                    <span className="font-medium">{rev.userName} 님</span>
                  </div>

                  <span className="text-[9px] text-deep-brown/40">
                    {new Date(rev.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Main feedback title and content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-deep-brown tracking-tight leading-snug">
                      {rev.title}
                    </h4>

                    {/* Authenticated Owner deletion capability */}
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(rev.id!)}
                        className="p-1.5 text-deep-brown/40 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="리뷰 삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-deep-brown/75 leading-relaxed font-light whitespace-pre-wrap">
                    {rev.content}
                  </p>

                  <div className="inline-flex items-center space-x-1 text-[10px] text-olive-light font-semibold bg-olive-green/5 py-1 px-2.5 rounded-full mt-2">
                    <ShieldCheck size={9} />
                    <span>실제 한 달 복용 사용자 (인증 마크)</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-warm-beige max-w-md mx-auto p-10 space-y-3">
          <Star size={24} className="text-brand-gold mx-auto animate-pulse" />
          <h4 className="font-serif text-lg font-bold text-deep-brown">작성 완료된 후기가 아직 발견되지 않았습니다</h4>
          <p className="text-xs text-deep-brown/60 font-light">
            해당 조건(제품군 및 기재 별점 점수)을 성립하는 후기가 아직 부재 상태입니다. 제일 먼저 맑은 웰니스 변화 후기를 들려주세요!
          </p>
          <button
            onClick={() => {
              setProductFilter('all');
              setRatingFilter('all');
            }}
            className="mt-4 px-4 py-1.5 bg-warm-beige hover:bg-brand-gold text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            필터 필터 초기화
          </button>
        </div>
      )}

      {/* Dynamic Submit Success floating Toast popup */}
      <AnimatePresence>
        {successToast && (
          <div className="fixed bottom-6 left-6 bg-olive-green text-white py-3.5 px-6 rounded-2xl shadow-xl z-50 flex items-center space-x-3 border border-warm-beige/30">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white">
              <CheckCircle size={14} />
            </div>
            <p className="text-xs sm:text-sm font-semibold">후기가 수 세기 노하우와 함께 영구 성공리에 안착 등록되었습니다!</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
