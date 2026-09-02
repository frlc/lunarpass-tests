export interface Mission {
  id: string,
  rocket: string,
  lunarBase: string,
  departureDate: string,
  returnDate: string,
  price: number
}

export interface Login {
  email: string,
  password: string
}