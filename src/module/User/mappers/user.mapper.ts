import type { Kyc, User, Wallet } from '../../../lib/prisma/generated/client.js';
import type { SupportedCurrency } from '../../../shared/constants/currencies.js';

export interface WalletView {
  id: string;
  currency: SupportedCurrency;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KycView {
  id: string;
  userId: string;
  status: Kyc['status'];
  submittedData: Kyc['submittedData'];
  reviewNote: string | null;
  reviewedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserView {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileView extends UserView {
  wallets: WalletView[];
  kyc: KycView | null;
}

export function mapWallet(wallet: Wallet): WalletView {
  return {
    id: wallet.id,
    currency: wallet.currency as SupportedCurrency,
    balance: wallet.balance.toString(),
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
  };
}

export function mapKyc(kyc: Kyc | null): KycView | null {
  if (!kyc) {
    return null;
  }

  return {
    id: kyc.id,
    userId: kyc.userId,
    status: kyc.status,
    submittedData: kyc.submittedData,
    reviewNote: kyc.reviewNote,
    reviewedAt: kyc.reviewedAt,
    createdAt: kyc.createdAt,
    updatedAt: kyc.updatedAt,
  };
}

export function mapUserProfile(user: User & { wallets: Wallet[]; kyc: Kyc | null }): UserProfileView {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    wallets: user.wallets.map(mapWallet),
    kyc: mapKyc(user.kyc),
  };
}
