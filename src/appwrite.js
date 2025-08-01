import { Client, Query , Databases,ID} from "appwrite";

const PROJECT_ID= import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DB_ID= import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID= import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const dataBase= new Databases(client);

export const updateSearchCount = async (searchTerm,movie) => {

    try {
        const result=await dataBase.listDocuments(DB_ID,COLLECTION_ID,[
            Query.equal('searchTerm',searchTerm),
        ]);
        if(result.documents.length>0){
            const document=  result.documents[0];
            await dataBase.updateDocument(DB_ID,COLLECTION_ID,document.$id,{
                count:document.count+1

            })
        }else{
            await dataBase.createDocument(DB_ID,COLLECTION_ID,ID.unique(),{
                searchTerm:searchTerm,
                count:1,
                movieId:movie.id,
                posterUrl:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            })
        }




        
    } catch (error) {
        console.log(error)
        
    }
}

export const fetchPopularMovies = async () => {

    const popularMovies= await dataBase.listDocuments(DB_ID,COLLECTION_ID,[
        Query.limit(5),
        Query.orderDesc("count"),
        
        

    ]
    )
    console.log(popularMovies.documents)
    return popularMovies.documents;
   
}

