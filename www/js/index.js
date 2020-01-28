document.addEventListener('click', (event) => {
    if (event.target.className !== 'welcome__button') return;
    const section = event.target.parentElement;
    section.style.display = 'none';
    document.querySelector('.content').style.padding = '5px';
    
    const url = 'http://dating.mts.by/android/search/ByLiked';
    getUsers(url);
});

const create = (tag = 'div') => document.createElement(tag);

async function getUsers(url) {
    const response = await fetch(url);
    const profiles = await response.json();
    const users = profiles.users;
    
    const cards = users.map((user) => {
        
        const cardTitle = create('h2');
        cardTitle.className = 'demo-card__title mdc-typography mdc-typography--headline6';
        cardTitle.textContent = user.name;
        
        const cardSubtitle = create('h2');
        cardSubtitle.className = 'demo-card__subtitle mdc-typography mdc-typography--subtitle2';
        cardSubtitle.textContent = `${user.age}, ${user.city}`;
        
        const cardInfo = create();
        cardInfo.className = 'demo-card__primary';
        cardInfo.append(cardTitle, cardSubtitle);
        
        const cardMediaContent = create();
        cardMediaContent.className = 'mdc-card__media-content demo-card__media-content';
        cardMediaContent.append(cardInfo);
        
        const cardMedia = create();
        cardMedia.className = 'mdc-card__media mdc-card__media--16-9 demo-card__media';
        cardMedia.style.backgroundImage = `url(${user.iurl_600})`;
        cardMedia.append(cardMediaContent);
        
        const cardPrimary = create();
        cardPrimary.className = 'mdc-card__primary-action demo-card__primary-action';
        cardPrimary.tabIndex = 0;
        cardPrimary.append(cardMedia);
        

        const iconOn = create('i');
        iconOn.className = 'material-icons mdc-icon-button__icon mdc-icon-button__icon--on';
        iconOn.textContent = 'favorite';
        
        const iconOff = create('i');
        iconOff.className = 'material-icons mdc-icon-button__icon';
        iconOff.textContent = 'favorite_border';
        
        const iconButton = document.createElement('button');
        iconButton.className = 'mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded';
        iconButton.setAttribute('aria-pressed', false);
        iconButton.setAttribute('aria-label', 'Add to favorites');
        iconButton.title = 'Add to favorites';
        iconButton.append(iconOn, iconOff);
        
        const cardActionIcons = create();
        cardActionIcons.className = '"mdc-card__action-icons';
        cardActionIcons.append(iconButton);
        
        const cardActionsInfo = create();
        cardActionsInfo.className = 'demo-card__secondary mdc-typography mdc-typography--body2';
        cardActionsInfo.textContent = `Last visit: ${user.lastVisit}`;
        
        const cardActions = create();
        cardActions.className = 'mdc-card__actions';
        cardActions.append(cardActionsInfo, cardActionIcons);
        
        
        const card = create();
        card.className = 'mdc-card demo-card demo-basic-with-text-over-media';
        card.append(cardPrimary, cardActions);
        
        return card;
    })
    
    const content = document.querySelector('.content');
    content.append(...cards);
};
