/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeerangUser {
  uid: string;
  displayName: string;
  email: string;
  createdAt: string; // ISO string
}

export type InquiryCategory = '소화환' | '변비환' | '배송 및 교환' | '기타';

export interface HeerangInquiry {
  id?: string;
  userId: string;
  userName: string;
  email: string;
  category: InquiryCategory;
  title: string;
  content: string;
  createdAt: string; // ISO string
}

export type ProductId = 'digestion' | 'constipation';

export interface HeerangReview {
  id?: string;
  userId: string;
  userName: string;
  productId: ProductId;
  rating: number; // 1 to 5
  title: string;
  content: string;
  createdAt: string; // ISO string
}

export interface StoryLike {
  id?: string;
  userId: string;
  storyId: string;
  createdAt: string; // ISO string
}

export interface StoryArticle {
  id: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  readTime: string;
  likesCount: number;
  tags: string[];
  publishedAt: string;
}
