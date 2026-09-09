export interface Mission {
  id: string,
  rocket: string,
  baseId: string,
  departureDate: string,
  returnDate: string,
  price: number
}

export interface Login {
  email: string,
  password: string
}

export interface Reservation {
  missionId: string
}

export interface Ticket {
  missionId: string
} 
