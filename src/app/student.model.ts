export interface Student {
    
    id: number
    FirstName: string
    LastName: string
    Contact: string
    Email: string
   
}

export interface Product {
    id: number
    productName: string
    price: number
    description: string
    file: any 
    created_by: string
}

export interface Posts{
    id?: number
    title: string
    text: string
    author: string
    date: Date

}