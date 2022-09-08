const $ = selector => document.querySelector(selector);

const $cart = $('#cart')
const $BtnCart = $('.cart-nav')
const $clearCart = $('#cart-clear')
const $cartContainer = $('#cart-list tbody')
const $shop = $('#shop')
const $cartLength = $('.cart-nav i')
let cartArticles = []

const loadListeners = () => {
    $BtnCart.addEventListener('click', openCart);
    $shop.addEventListener('click', addArticle);
    $clearCart.addEventListener('click', clearCartList);
    $cart.addEventListener('click', deleteArticle);
}

loadListeners();


//Functions

function openCart(e) {
    if (e.target.nodeName == 'I') {
        ($cart.classList.contains('hide'))
            ? $cart.classList.remove('hide')
            : $cart.classList.add('hide')
    }
}



function addArticle(e) {
    e.preventDefault()

    if (e.target.classList.contains('btn-card')) {
        const article = e.target.parentElement
        readArticle(article)


        if ($cart.classList.contains('hide'))
            $cart.classList.remove('hide')
    }
}



function readArticle(article) {
    const infoArticle = {
        img: article.querySelector('img').src,
        name: article.querySelector('h3').textContent,
        price: article.querySelector('.price').textContent,
        id: article.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    const exist = cartArticles.some(article => article.id === infoArticle.id)
    if (exist) {
        const articles = cartArticles.map(article => {
            if (article.id === infoArticle.id) {
                article.cantidad++;
                return article;
            } else {
                return article;
            }
        });
        cartArticles = [...articles];
    } else {
        cartArticles = [...cartArticles, infoArticle]
    }


    PrintCartHTML()
}



function deleteArticle(e) {
    e.preventDefault()

    if (e.target.classList.contains('delete-article')) {

        const articleId = e.target.getAttribute('data-id')

        cartArticles.forEach(article => {
            if (articleId === article.id)
                (article.cantidad > 1)
                    ? article.cantidad--
                    : cartArticles.splice(cartArticles.indexOf(article), 1)

        });
    }
    PrintCartHTML()
}



function PrintCartHTML() {

    (cartArticles.length > 0)
        ? $cartLength.setAttribute('data', cartArticles.length.toString())
        : $cartLength.setAttribute('data', '')

    cleanHTML()

    cartArticles.forEach(article => {
        const row = document.createElement('tr')

        row.innerHTML = `
        <td><img src="${article.img}" width="100px"></td>
        <td>${article.name}</td>
        <td>${article.price}</td>
        <td> ${article.cantidad}</td>
        <td><a href="#"" class="delete-article" data-id="${article.id}"> X </a></td>
        `;
        $cartContainer.appendChild(row)
    })
}

function cleanHTML() {
    while ($cartContainer.firstChild) {
        $cartContainer.removeChild($cartContainer.firstChild)
    }
}

function clearCartList() {
    cartArticles = []
    cleanHTML()
}