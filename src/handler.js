const books = require('./book')
const {nanoid} = require('nanoid')


// Menambahkan Buku
const addBooksHandle = (request,h)=>{
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;

  if(name === undefined){
    const response = h.response({
      status:"fail",
      message : "Buku gagal ditambahkan",
        data :{
          book : id,
        }
    })
    response.code(400);
    return response        
  }


  if(pageCount < readPage){
    const response = h.response({
      status:"fail",
      message : "pageCount tidak boleh lebih kecil dari readPage",
        data :{
          book : id,
      }
    })
    response.code(400);
    return response        
  }

  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading,insertedAt,updatedAt
  };

  books.push(newBooks)

  const isSuccess = books.filter(book => book.id === id).length > 0;

  if(isSuccess){
  const response = h.response({
    status:"success",
    message : "Buku Berhasil Di Tambahkan",
        data :{
          book : id,
        }
  });
  response.code(200);
  return response
}
  
}


// Menampilkan Buku
const getBooksHandle = ()=>({
    status : '200',
    data : {
        books
    }
})
// Menampilkan detail buku
const getDetailBook = (request,h)=>{
  const { id } = request.params;
  const book = books.filter(book => book.id === id);

  if(book !== undefined){
    return{
      status : 'success',
      data : {
        book
      }
    }
  }

  const response = h.response({
    status : 'fail',
    message : 'Buku tidak ditemukan!'
  })
  response.code(404)
  return response
}

// Mengedit Buku
const getDetailUpdateBook = (request,h)=>{
  const { id } = request.params;
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
  const updatedAt = new Date().toISOString();

  const index = books.findIndex(book => book.id === id);
  if(index !== -1){
    books[index] = {
      ...books[index],
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage,
      reading
    }
    const response = h.response({
      message : "Berhasil Memperbarui Buku",
      status : 'success'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status:'fail',
    message:'Gagal Memperbarui Catatan. Id Tidak Di Temukan'
  });
  response.code(404);
  return response;
}

const getDeleteBook = (request, h)=>{
  const { id } = request.params;
  const index = books.findIndex(book => book.id === id)
  if(index !== -1){
    books.splice(index,1);
    const response = h.response({
      status : "success",
      message : "Buku berhasil di hapus!"
    })
    response.code(200);
    return response;
  }

  const response = h.response({
    status : 'fail',
    message : 'Gagal memperbarui buku'
  })  
  response.code(404);
  return response;
}

module.exports = {addBooksHandle, getBooksHandle,getDetailBook,getDetailUpdateBook,getDeleteBook}