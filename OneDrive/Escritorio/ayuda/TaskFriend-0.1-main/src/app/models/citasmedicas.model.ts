export interface appointments{
    id: string,
    title: string,
    description: string,
    items: Item[];
}

export interface Item{
    name: string,
    completed: boolean,
}
 
export interface citasmedicas {
    id: string;
    title: string;
    description: string;
    date: string;   // Make sure these properties exist
    time: string;
    hospital: string;
    reason: string;
    items: Item[];
  }
  