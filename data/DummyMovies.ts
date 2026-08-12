
export type MovieType = {
    id:string
    title: string;
    actorList: string[];
    releaseYear: Date;
}

export const movieList: MovieType[]= [
    {
        id:'1',
        title:'Big Movie',
        actorList: ['Guy Parson', 'Acto R', 'Glah Mourus', 'Rhea Allname'],
        releaseYear:new Date('1970-08-12')
    },
    {
        id:'2',
        title: 'Little Movie',
        actorList: ['Hugh Mann', 'Scriptri Ter'],
        releaseYear: new Date('2001-01-01')
    }
];