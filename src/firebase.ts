import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, getDocFromServer } from 'firebase/firestore';
import { HeerangReview, HeerangInquiry, StoryLike, HeerangUser } from './types';
import firebaseConfig from '../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Check if we are running in local mock fallback mode or actual Firebase mode
export const IS_MOCK_MODE = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('mock_api_key_placeholder');

let firebaseApp;
let firestoreDb: any = null;
let firebaseAuth: any = null;

if (!IS_MOCK_MODE) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    firebaseAuth = getAuth(firebaseApp);
  } catch (error) {
    console.error("Firebase init failed, switching to local mock mode:", error);
  }
}

export const db = firestoreDb;
export const auth = firebaseAuth;

// Helper: Handle Error formatting based on core skill specifications
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((p: any) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// -----------------------------------------
// REVIEWS SERVICE
// -----------------------------------------

export async function fetchReviews(): Promise<HeerangReview[]> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_reviews');
    if (list) {
      return JSON.parse(list);
    }
    // Default initial mockup reviews matching requested content
    const defaults: HeerangReview[] = [
      {
        id: 'review_1',
        userId: 'user_mock_1',
        userName: '박민서',
        productId: 'digestion',
        rating: 5,
        title: '식후 더부룩함이 싹 사라졌어요!',
        content: '과식이 잦고 불규칙한 식사 때문에 항상 저녁에 소화가 안되었는데, 영양제 대신 희랑 소화환을 식후에 먹기 시작하면서 속이 너무 편안해졌습니다. 한방향도 강하지 않고 휴대가 간편해서 가방에 들고 다니기 너무 좋습니다.',
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'review_2',
        userId: 'user_mock_2',
        userName: '김현우',
        productId: 'constipation',
        rating: 5,
        title: '말 못할 답답함이 해결되었습니다. 추천합니다.',
        content: '사무실에 오랫동안 하루 종일 앉아서 생활하는 직장인입니다. 배변 활동이 불규칙해서 스트레스였는데 희랑 변비환 복용 후 신호가 주기적으로 오고 화장실 가는 게 너무 부드럽고 가벼워졌어요. 벌써 재구매해서 부모님께도 선물해 드렸습니다.',
        createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'review_3',
        userId: 'user_mock_3',
        userName: '이지수',
        productId: 'digestion',
        rating: 4,
        title: '소화기가 약한 부모님 선물용으로 최고네요.',
        content: '어머니께서 늘 식사 후에 가스가 차서 힘들어하셨는데 희랑 소화환 한 포 드시면 속이 시원해진다고 하셔요. 엄선된 한방 원료에 포장도 기품 있고 정성스러워서 부모님 선물용 혹은 명절 선물로도 적극 권합니다.',
        createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString()
      }
    ];
    localStorage.setItem('heerang_reviews', JSON.stringify(defaults));
    return defaults;
  }

  const path = 'reviews';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as HeerangReview));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return [];
  }
}

export async function addReview(review: Omit<HeerangReview, 'id'>): Promise<HeerangReview> {
  if (IS_MOCK_MODE || !db) {
    const list = await fetchReviews();
    const newReview = { ...review, id: `review_${Date.now()}` };
    list.unshift(newReview);
    localStorage.setItem('heerang_reviews', JSON.stringify(list));
    return newReview;
  }

  const path = 'reviews';
  try {
    const docRef = await addDoc(collection(db, path), review);
    return { ...review, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  if (IS_MOCK_MODE || !db) {
    const list = await fetchReviews();
    const filtered = list.filter(r => r.id !== reviewId);
    localStorage.setItem('heerang_reviews', JSON.stringify(filtered));
    return;
  }

  const path = `reviews/${reviewId}`;
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

// -----------------------------------------
// INQUIRIES SERVICE
// -----------------------------------------

export async function fetchInquiries(userId: string): Promise<HeerangInquiry[]> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_inquiries');
    if (list) {
      const all: HeerangInquiry[] = JSON.parse(list);
      return all.filter(i => i.userId === userId);
    }
    return [];
  }

  const path = 'inquiries';
  try {
    const q = query(collection(db, path), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as HeerangInquiry));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return [];
  }
}

export async function addInquiry(inquiry: Omit<HeerangInquiry, 'id'>): Promise<HeerangInquiry> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_inquiries');
    const all: HeerangInquiry[] = list ? JSON.parse(list) : [];
    const newInquiry = { ...inquiry, id: `inquiry_${Date.now()}` };
    all.unshift(newInquiry);
    localStorage.setItem('heerang_inquiries', JSON.stringify(all));
    return newInquiry;
  }

  const path = 'inquiries';
  try {
    const docRef = await addDoc(collection(db, path), inquiry);
    return { ...inquiry, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

// -----------------------------------------
// STORY LIKES SERVICE
// -----------------------------------------

export async function fetchLikesCount(storyId: string): Promise<number> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_likes_map');
    const likesMap = list ? JSON.parse(list) : {};
    return likesMap[storyId]?.length || 0;
  }

  const path = 'storyLikes';
  try {
    const q = query(collection(db, path), where('storyId', '==', storyId));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return 0;
  }
}

export async function isStoryLikedByUser(storyId: string, userId: string): Promise<boolean> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_likes_map');
    const likesMap = list ? JSON.parse(list) : {};
    const users = likesMap[storyId] || [];
    return users.includes(userId);
  }

  const path = 'storyLikes';
  try {
    const q = query(collection(db, path), where('storyId', '==', storyId), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return false;
  }
}

export async function toggleStoryLike(storyId: string, userId: string): Promise<boolean> {
  if (IS_MOCK_MODE || !db) {
    const list = localStorage.getItem('heerang_likes_map');
    const likesMap = list ? JSON.parse(list) : {};
    if (!likesMap[storyId]) {
      likesMap[storyId] = [];
    }

    const userList: string[] = likesMap[storyId];
    const index = userList.indexOf(userId);
    let liked = false;
    if (index === -1) {
      userList.push(userId);
      liked = true;
    } else {
      userList.splice(index, 1);
    }
    likesMap[storyId] = userList;
    localStorage.setItem('heerang_likes_map', JSON.stringify(likesMap));
    return liked;
  }

  const path = 'storyLikes';
  try {
    // Check if like exists
    const q = query(collection(db, path), where('storyId', '==', storyId), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      // Unlike
      const dRef = snapshot.docs[0].ref;
      await deleteDoc(dRef);
      return false;
    } else {
      // Like
      const likeObj: StoryLike = {
        userId,
        storyId,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, path), likeObj);
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

// -----------------------------------------
// AUTHENTICATION PROVIDERS
// -----------------------------------------

export interface HeerangSessionUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  emailVerified: boolean;
}

export async function loginWithGooglePopup(): Promise<HeerangSessionUser> {
  if (IS_MOCK_MODE || !auth) {
    // Generate an elegant mock profile with standard verification flags
    const mockUser: HeerangSessionUser = {
      uid: 'user_mock_99',
      displayName: '홍길동',
      email: 'gnhaappy@gmail.com',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      emailVerified: true
    };
    localStorage.setItem('heerang_mock_user', JSON.stringify(mockUser));
    return mockUser;
  }

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const u = result.user;
    return {
      uid: u.uid,
      displayName: u.displayName || '회원',
      email: u.email || '',
      photoURL: u.photoURL || undefined,
      emailVerified: u.emailVerified
    };
  } catch (error) {
    console.error("Firebase popup authentication failed:", error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  if (IS_MOCK_MODE || !auth) {
    localStorage.removeItem('heerang_mock_user');
    return;
  }
  await signOut(auth);
}

export function getCurrentlyLoggedUser(): HeerangSessionUser | null {
  if (IS_MOCK_MODE) {
    const st = localStorage.getItem('heerang_mock_user');
    return st ? JSON.parse(st) : null;
  }
  const u = auth?.currentUser;
  if (!u) return null;
  return {
    uid: u.uid,
    displayName: u.displayName || '회원',
    email: u.email || '',
    photoURL: u.photoURL || undefined,
    emailVerified: u.emailVerified
  };
}
