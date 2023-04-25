const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '0cca82e15b804b91b0ebd081b5c78716',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
console.log(process.env.BASE_URL, 'url');
export default apiConfig;
