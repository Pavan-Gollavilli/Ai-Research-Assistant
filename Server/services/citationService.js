const generateCitations = (articles, books) => {

const citations=[];

articles.forEach(article=>{

citations.push({

type:"article",

title:article.title,

url:article.url,

citation:`${article.title}. ${article.url}`

});

});

books.forEach(book=>{

citations.push({

type:"book",

title:book.title,

url:book.infoLink,

citation:`
${book.authors.join(", ")}.

${book.title}.

${book.publisher}

${book.publishedDate}
`

});

});

return citations;

};

module.exports={
generateCitations
};