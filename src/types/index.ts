export interface TodayClothingData {
  sectionId: string;
  clothingId: string;
  color: string;
}

export interface OotdType {
  date: string;
  clothingList: TodayClothingData[];
}
