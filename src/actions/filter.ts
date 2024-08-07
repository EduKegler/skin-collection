"use server";

import {
  COOKIE,
  supportedCollectTypes,
  supportedLegacyTypes,
  supportedOrderTypes,
  supportedTierTypes,
} from "@/contants";
import { ICollectFilter, ILegacyFilter, IOrderBy, ITierFilter } from "@/type";
import { cookies } from "next/headers";

export async function getDefaultFilter() {
  const collectFilter = await getCollectFilter();
  const tierFilter = await getTierFilter();
  const legacyFilter = await getLegacyFilter();
  const orderBy = await getOrderBy();
  return { collectFilter, tierFilter, legacyFilter, orderBy };
}

export async function getCollectFilter(): Promise<ICollectFilter> {
  const collectFilter = cookies().get(COOKIE.COLLECT_FILTER)?.value as ICollectFilter;
  return supportedCollectTypes.includes(collectFilter) ? collectFilter : "All";
}

export async function updateCollectFilter(collectFilter: ICollectFilter) {
  cookies().set(COOKIE.COLLECT_FILTER, collectFilter);
}

export async function getTierFilter(): Promise<ITierFilter> {
  const tierFilter = cookies().get(COOKIE.TIER_FILTER)?.value as ITierFilter;
  return supportedTierTypes.includes(tierFilter) ? tierFilter : "All";
}

export async function updateTierFilter(collectFilter: ITierFilter) {
  cookies().set(COOKIE.TIER_FILTER, collectFilter);
}

export async function getLegacyFilter(): Promise<ILegacyFilter> {
  const legacyFilter = cookies().get(COOKIE.LEGACY_FILTER)?.value as ILegacyFilter;
  return supportedLegacyTypes.includes(legacyFilter) ? legacyFilter : "All";
}

export async function updateLegacyFilter(collectFilter: ILegacyFilter) {
  cookies().set(COOKIE.LEGACY_FILTER, collectFilter);
}

export async function getOrderBy(): Promise<IOrderBy> {
  const orderBy = cookies().get(COOKIE.ORDER_BY)?.value as IOrderBy;
  return supportedOrderTypes.includes(orderBy) ? orderBy : "ReleaseDate";
}

export async function updateOrderBy(collectFilter: IOrderBy) {
  cookies().set(COOKIE.ORDER_BY, collectFilter);
}
