import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, BookOpen, Clock, Calendar, ChevronRight, X } from 'lucide-react';
import { getCurrentlyLoggedUser, fetchLikesCount, isStoryLikedByUser, toggleStoryLike } from '../firebase';
import { StoryArticle } from '../types';

export default function HeerangStory() {
  const [articles, setArticles] = useState<StoryArticle[]>([]);
  const [likedMap, setLikedMap] = useState<{ [storyId: string]: boolean }>({});
  const [likesCountMap, setLikesCountMap] = useState<{ [storyId: string]: number }>({});
  const [selectedArticle, setSelectedArticle] = useState<StoryArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const staticArticles: StoryArticle[] = [
    {
      id: 'digest_tips_01',
      title: '일상을 바꾸는 3대 소화 건강 관리법',
      category: '소화',
      snippet: '식사를 한 뒤 겪는 더부룩함에서 해방되기 위한 세 가지 핵심 습관들. 물 마시기 섭취 패턴과 꼭꼭 씹는 짓의 과학적 효과를 알아봅니다.',
      readTime: '4분',
      likesCount: 12,
      tags: ['소화', '위장관리', '습관교정'],
      publishedAt: '2026-06-12',
      content: `## 1. 30분의 법칙: 식전·식후 물 마시기
많이들 물은 소화를 촉진해 준다고 생각해 밥과 물을 함께 마십니다. 하지만 식사 직전이나 식사 도중 마시는 다량의 물은 위액을 희석시켜 오히려 역효과를 초래합니다. 물은 가급적 식사 30분 전에 충분수분을 미리 충전하시고, 식사 뒤 30분이 지난 시간부터 미온수를 나누어 복용하시는 것이 소화 효소 작용에 아주 이상적입니다.

## 2. 30회 씹기의 미학: 물리적 정렬의 신비
우리 치아가 소화하는 영역은 강력합니다. 현대인의 연약한 위장은 고스란히 넘어오는 덩어리를 소화시키며 만성 수축 통증을 일으키죠. 삼키기 전에 정직하게 한 숟갈당 30번을 어금니로 가 잘게 쪼개는 것만으로도 위장의 압력 에너지를 70% 감소시킬 수 있으며 침 속에 가득 들어있는 천연 소화 효소인 '아밀라아제'가 전분과 영양분을 평온하게 흡수될 수 있게 사전에 완벽히 조제해 줍니다.

## 3. 식사 직후 누움 방지: 위산 역류의 원천 예방
퇴근 뒤 배불리 식사를 마친 후 편히 소파나 침대에 눕는 것만큼 아늑한 시간이 없죠? 하지만 이는 하부식도괄약근 힘을 잃게 하여 급격한 위산 역류와 역류성 식도 통증을 야기하는 지름길입니다. 식후 최소 2시간 동안은 눕지 않고 가볍게 거실을 거닐거나 소형 세탁기를 조율하는 등 정적인 세로 서서 타임을 지키십시오.`
    },
    {
      id: 'gut_tips_02',
      title: '장 건강을 위한 매일의 생활 습관 가이드',
      category: '장건강',
      snippet: '단순 유산균 섭취를 넘어 장내 유익균을 건강하게 유지시켜 가벼운 변 상태를 가꾸는 세 가지 핵심 비결을 전달해 드립니다.',
      readTime: '3분',
      likesCount: 18,
      tags: ['장건강', '유익균', '배변'],
      publishedAt: '2026-06-10',
      content: `## 1. 식이섬유 먹이 공급: 프리바이오틱스의 원리
장속 유익한 미생물들은 유산균 그 세포 자체를 먹는다기보단, 이들이 생장하기 유리한 '식이섬유' 탄소원을 먹습니다. 사과 껍질, 귀리 가루, 브로콜리의 질긴 줄기 부분 및 미역·다시마의 미끄러운 알긴산 섬유들이 아주 귀중한 유익 미생물의 영양 공급처입니다. 매 식사 시 자연물 기반 잎 채소류를 한 품목씩 끼워 먹는 전개는 거대한 복강 청소의 일차 습관입니다.

## 2. 온열 마시지: 장 신경망 가꾸기
복부는 우리 뇌 다음으로 미세 신경들이 많이 포진된 '제2의 뇌'로써, 극히 미세하게 차가운 자극에 마비 상태가 유발됩니다. 아침에 침대에서 깨어나 배꼽 주위를 시계 방향으로 지그시 원을 그리며 따스한 온열 자극을 주시면 장 장관들이 부드럽게 윤활 운동을 시작하여 불규칙한 요의 신호를 정렬 가속시킵니다.

## 3. 규칙적인 배변 타임 설정
바쁜 출근 대기에 밀려 화장실 신호를 지속적으로 억누르고 참게 되면 장 신경의 임계 압력 감각이 둔화되어 만성 변비로 진행합니다. 정기적으로 아침 식사 마친 뒤 신호가 특별히 없더라도 같은 시각에 화장실 양변기에 앉아 5분간 숨을 천천히 호흡하는 일종의 '장 조건 반사 트레이닝' 패턴을 이식하면 점차 아침마다 쾌변 신호가 주기에 맞춰 발동합니다.`
    },
    {
      id: 'diet_story_03',
      title: '건강한 식습관: 소로(小路)를 지키는 법',
      category: '식습관',
      snippet: '세상의 인공 자극적인 단짠 맛 사이에서 본연의 담백한 맛의 영양을 부활시키는 마음을 챙기는 식사(Mindful Eating) 지표.',
      readTime: '5분',
      likesCount: 9,
      tags: ['마인드풀', '클린식단', '자연주의'],
      publishedAt: '2026-06-08',
      content: `## 1. 마음을 다하는 음미 (Mindful Eating)
우리는 점심 식사 시간 속에서조차 휴대 전화를 바라보며 정보를 들이키거나 업무 메시지를 치는 경우가 다반사입니다. 시선이 딴 곳에 팔렸을 때 혀의 미뢰 세포가 미처 포만 신호를 신경계로 보내기도 전에 과식을 범하기 마련입니다. 음식의 질감과 은은하게 우러나는 한방 보전 성분, 곡물의 결을 직접 시선으로 마주 보고 집중하는 소로를 지키는 온전한 식사를 지탱하십시오.

## 2. 정제 가공 탄수화물의 우회법
인스턴트 액상과당, 정제 밀가루 과자는 몸속 혈당을 롤러코스터처럼 급등락시켜 췌장을 고장 내고 장내 세균총 생태계를 부패 유해균 천국으로 개조합니다. 순수한 형태의 현미, 찌거나 구운 감자, 고구마 등 대지 본연의 미가공 복합 당질로 조금씩 변환하시는 것만으로 온몸의 누적 피로가 마법같이 날아가는 놀라움을 체감할 수 있습니다.`
    },
    {
      id: 'season_care_04',
      title: '사계절 절기별 건강 관리의 평온',
      category: '계절건강',
      snippet: '외부 기온의 급작스러운 변화 속에서 면역력을 온전하게 안보하기 위한 동양 전통의 계절 기후 보완 가이드를 나눕니다.',
      readTime: '4분',
      likesCount: 15,
      tags: ['절기', '면역력', '한방에너지'],
      publishedAt: '2026-06-05',
      content: `## 1. 춘하추동 자연과 맞닿는 바이오리듬
- **봄 (춘기):** 대지에 생기들이 차오르듯 몸 속 독소들을 조금씩 봄나물과 쌉싸름한 야채로 털어내는 해독 디톡스를 주도합니다.
- **여름 (하기):** 냉방기와 찬 얼음 음료 과다로 몸 안 심부 위장 온도가 급격히 빙결됩니다. 따뜻한 차나 삼계탕류의 이열치열로 심부 위장을 온정하게 감싸주는 전략이 소화 장애와 피로를 진압합니다.
- **가을 (추기):** 기온의 건조함이 장기를 위축시키므로, 기관지와 대지의 수분을 유지시키는 촉촉한 연근이나 유근피 차 섭취가 어우러져야 좋습니다.
- **겨울 (동기):** 심부 온도를 보호하는 둥글고 단단한 뿌리 야채와 양기를 지키는 웰니스 환 보전제 하나로 응축된 관리를 지휘해 줍니다.`
    },
    {
      id: 'habits_story_05',
      title: '행복한 일상을 만드는 기쁨의 작은 도정',
      category: '마인드셋',
      snippet: '스트레스 코티솔 수치를 영구 지배하는 거부감 없는 정서적 루틴 교정과 자연 속 기쁨을 온전히 마주하는 지혜로운 비결.',
      readTime: '3분',
      likesCount: 22,
      tags: ['스트레스', '회복탄력', '정서웰빙'],
      publishedAt: '2026-06-01',
      content: `## 1. 아침 10분 햇살 포옹: 흑막의 호르몬 멜라토닌 정렬
눈을 뜬 후 침실 커튼을 시원하게 젖혀 10분 이상 태양 자연광을 우리 시야 망막으로 받아들이면, 낮 동안 활력을 내는 '세로토닌' 분비가 본격 세팅되어 저녁 무렵 천연 수면 보조 호르몬 '멜라토닌'으로 온전하게 치환되어 숙면의 질을 보장합니다.

## 2. 감사의 언어 기입: 회복탄력성 극대화
작은 메모장에 매일 밤 '오늘 기쁘고 감사한 3가지 풍경'을 손 글씨로 정갈하게 적는 버릇을 가져보십시오. 스트레스 상황을 부각하는 편도체 활성을 억제하고 이성적 정돈을 담당하는 전두엽 에너지를 상쾌하게 길러주어, 소화 능력에 막대한 지장을 주는 교감신경계 폭주 긴장을 즉시 다정하게 제동해 줍니다.`
    }
  ];

  useEffect(() => {
    // Combine likes sync
    const initLikesAndStates = async () => {
      const user = getCurrentlyLoggedUser();
      const updatedCounts: { [storyId: string]: number } = {};
      const updatedHeartStates: { [storyId: string]: boolean } = {};

      for (const item of staticArticles) {
        const count = await fetchLikesCount(item.id);
        // Base starting likes + database count
        updatedCounts[item.id] = item.likesCount + count;

        if (user) {
          const liked = await isStoryLikedByUser(item.id, user.uid);
          updatedHeartStates[item.id] = liked;
        } else {
          updatedHeartStates[item.id] = false;
        }
      }

      setArticles(staticArticles);
      setLikesCountMap(updatedCounts);
      setLikedMap(updatedHeartStates);
    };

    initLikesAndStates();
    // Check local storage updates periodically
    const handleStorageEvent = () => initLikesAndStates();
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  const handleHeartToggle = async (storyId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const user = getCurrentlyLoggedUser();

    if (!user) {
      alert('이야기를 추천하려면 먼저 로그인해 주세요. 상단 우측 [로그인]을 클릭하시면 체험용 계정으로 간편 승인됩니다.');
      return;
    }

    try {
      const isNowLiked = await toggleStoryLike(storyId, user.uid);
      
      setLikedMap(prev => ({ ...prev, [storyId]: isNowLiked }));
      setLikesCountMap(prev => ({
        ...prev,
        [storyId]: isNowLiked ? prev[storyId] + 1 : prev[storyId] - 1
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const categories = ['전체', '소화', '장건강', '식습관', '계절건강', '마인드셋'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === '전체' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-24 md:py-32 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Dynamic Contents Hub Header */}
      <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
        <span className="text-xs text-brand-gold font-bold tracking-widest uppercase font-serif mb-2 block">
          HEERANG STORY
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown tracking-tight mb-4">
          쉼표와 행복을 주는 웰니스 서재
        </h2>
        <div className="w-12 h-[2px] bg-brand-gold mx-auto mb-6" />
        <p className="text-xs sm:text-sm text-deep-brown/70 leading-relaxed font-light">
          희랑은 단지 포뮬러를 조각하는 것을 뛰어넘어, 고객의 매일이 기쁨과 푸른 자연주의 평온으로 채워질 수 있는 건강 이야기들을 정성을 실어 배필합니다.
        </p>
      </div>

      {/* Dynamic Search & Navigation Category Filter Rail */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-3xl border border-warm-beige/50">
        {/* Responsive horizontal category scroller */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-olive-green text-white shadow-xs'
                  : 'text-deep-brown/70 hover:bg-warm-beige/35 hover:text-deep-brown'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Flat search input panel */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-brown/40" />
          <input
            type="text"
            placeholder="건강 키워드 및 태그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-warm-cream border border-warm-beige/60 rounded-full text-xs text-deep-brown placeholder-deep-brown/40 focus:outline-none focus:border-brand-gold focus:bg-white transition-all font-light"
          />
        </div>
      </div>

      {/* Grid List displaying filtered Stories */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const hasHeart = likedMap[article.id] || false;
            const currentHeartCount = likesCountMap[article.id] || article.likesCount;

            return (
              <motion.article
                key={article.id}
                layout
                whileHover={{ y: -5 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-warm-beige/40 flex flex-col justify-between hover:border-brand-gold/60 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-[10px] text-deep-brown/50">
                    <span className="font-semibold text-brand-gold uppercase tracking-wider font-serif bg-warm-beige/35 px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Clock size={11} />
                        <span>{article.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={11} />
                        <span>{article.publishedAt}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-deep-brown tracking-tight mb-3 hover:text-olive-green transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-deep-brown/70 leading-relaxed font-light mb-5 line-clamp-3">
                    {article.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-beige/40 flex items-center justify-between mt-auto">
                  {/* Article Tags rendering */}
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] text-olive-light bg-olive-green/5 px-2 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Persistence Liked Button wrapper */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => handleHeartToggle(article.id, e)}
                      className={`flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full transition-all group border cursor-pointer ${
                        hasHeart
                          ? 'bg-rose-50 border-rose-100 text-rose-500 font-semibold'
                          : 'bg-warm-beige/10 border-warm-beige text-deep-brown/65 hover:bg-rose-50 hover:text-rose-500'
                      }`}
                      title={hasHeart ? '추천 취소' : '이야기 추천'}
                    >
                      <Heart
                        size={12}
                        className={`transition-transform duration-300 group-hover:scale-125 ${
                          hasHeart ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span>{currentHeartCount}</span>
                    </button>

                    <ChevronRight size={14} className="text-deep-brown/45 select-none" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-warm-beige/30 max-w-lg mx-auto p-10 space-y-3">
          <BookOpen size={30} className="text-brand-gold/60 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-deep-brown">검색 결과가 발견되지 않았습니다</h4>
          <p className="text-xs text-deep-brown/60 font-light">
            죄송합니다. 다른 철청 키워드(예: 소화, 장건강, 면역력)로 다시 한 번 점검 탐색을 진행해 주세요.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('전체');
            }}
            className="mt-4 px-4 py-2 bg-warm-beige hover:bg-brand-gold text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            전체 목록 복원
          </button>
        </div>
      )}

      {/* Reading Article Full Drawer Popup Dialog */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-deep-brown/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Core Modal Card */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              className="bg-warm-cream w-full max-w-2xl rounded-[2.5rem] border border-brand-gold/20 shadow-2xl p-6 sm:p-10 relative z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 text-deep-brown/60 hover:text-deep-brown focus:outline-none transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-brand-gold font-serif">
                  <span className="font-bold uppercase tracking-widest bg-warm-beige px-3 py-1 rounded-md">
                    {selectedArticle.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>읽기 시간 약 {selectedArticle.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-deep-brown leading-tight tracking-tight">
                  {selectedArticle.title}
                </h3>

                <hr className="border-t border-warm-beige" />

                {/* Sub-body content rendered dynamically */}
                <div className="text-xs sm:text-sm text-deep-brown/85 font-sans leading-relaxed tracking-wide space-y-6 font-light">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                    const isHeading2 = paragraph.startsWith('## ');
                    if (isHeading2) {
                      return (
                        <h4 key={index} className="font-serif text-base sm:text-lg font-bold text-olive-green pt-4 pb-1 border-b border-warm-beige flex items-center space-x-2">
                          <span className="text-brand-gold font-serif">◆</span>
                          <span>{paragraph.replace('## ', '')}</span>
                        </h4>
                      );
                    }
                    const isBullet = paragraph.startsWith('- ');
                    if (isBullet) {
                      return (
                        <div key={index} className="pl-4 space-y-2">
                          {paragraph.split('\n').map((line, lidx) => (
                            <div key={lidx} className="flex items-start space-x-2 text-xs py-0.5">
                              <span className="text-brand-gold flex-shrink-0">•</span>
                              <span className="font-light">{line.substring(2)}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                <hr className="border-t border-warm-beige pt-4" />

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-olive-light bg-olive-green/5 py-1 px-3 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-medium">
                    <button
                      onClick={(e) => handleHeartToggle(selectedArticle.id, e)}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full cursor-pointer transition-all ${
                        likedMap[selectedArticle.id]
                          ? 'bg-rose-50 text-rose-500 font-semibold border border-rose-100'
                          : 'bg-white text-deep-brown/70 hover:bg-rose-50 hover:text-rose-500 border border-warm-beige'
                      }`}
                    >
                      <Heart
                        size={14}
                        className={likedMap[selectedArticle.id] ? 'fill-rose-500 text-rose-500' : ''}
                      />
                      <span>이 건강기록 추천 {likesCountMap[selectedArticle.id] || selectedArticle.likesCount}</span>
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-4 py-2 bg-deep-brown text-white rounded-full hover:bg-black transition-colors cursor-pointer"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
