import { Photo } from "./photo"

export interface Member {
  id: number
  username: string
  age: number
  photoUrl: string
  createdAt: Date
  lastActive: Date
  knownAs: string
  city: string
  country: string
  interests: string
  lookingFor: string
  introduction: string
  gender: string
  photos: Photo[]
}

