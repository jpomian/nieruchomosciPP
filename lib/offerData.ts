"use server";

import { getRedisClient } from "./db";

interface OfferData {
  id: string;
  url: string;
}

export async function getPropertyOffers(): Promise<OfferData[]> {
  const client = await getRedisClient();
  
  try {
    const keys = await client.keys('offer:*');
    const offers = [];
    
    for (const key of keys) {
      const offer = await client.hGetAll(key);
      offers.push({
        id: offer.id,
        url: offer.url,
      });
    }
    
    return offers;
  } catch (error) {
    console.error("Error reading property offers from Redis:", error);
    return [];
  }
}

export async function getPropertyOffer(id: string): Promise<OfferData | undefined> {
  const client = await getRedisClient();
  
  try {
    const offer = await client.hGetAll(`offer:${id}`);
    if (!offer.id) {
      return undefined;
    }
    
    return {
      id: offer.id,
      url: offer.url,
    };
  } catch (error) {
    console.error(`Error reading property offer ${id} from Redis:`, error);
    return undefined;
  }
}

export async function addPropertyOffer(offer: Omit<OfferData, "id">): Promise<void> {
  const client = await getRedisClient();
  
  const newOffer: OfferData = {
    ...offer,
    id: Date.now().toString(),
  };

  try {
    await client.hSet(`offer:${newOffer.id}`, {
      id: newOffer.id,
      url: newOffer.url,
    });
  } catch (error) {
    console.error("Error adding property offer to Redis:", error);
    throw error;
  }
}

export async function deletePropertyOffer(id: string): Promise<void> {
  const client = await getRedisClient();
  
  try {
    const exists = await client.exists(`offer:${id}`);
    if (!exists) {
      throw new Error(`Offer with id ${id} not found`);
    }
    
    await client.del(`offer:${id}`);
  } catch (error) {
    console.error(`Error deleting property offer ${id} from Redis:`, error);
    throw error;
  }
}