document.addEventListener('DOMContentLoaded', ( )=> 
{
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-btn');
    const listItems = document.querySelectorAll('.search-items .item a');
    const suggestionList = document.querySelector('.suggestions');

    let currentIndex = -1;

    function filterSearches(search){
        const matches = [];
        search = search.toLowerCase();

        listItems.forEach(items => 
        {
            const text = items.textContent.toLowerCase();
            if (text.includes(search) && search !== "")
            {
                matches.push({
                    text: items.textContent,
                    href: items.getAttribute('href')
                });
            }
        });

        return matches;
    }

    function showSuggestions(matches){
        suggestionList.innerHTML = '';
        currentIndex = -1;

        if (matches.length === 0)
        {
            suggestionList.style.display = 'none';
        return;
        }

    matches.forEach((match, index) => {
        const div = document.createElement('div');
        div.classList.add('suggestions-item');
        div.textContent = match.text;
        div.dataset.index = index;
        div.addEventListener('click', () => {
            window.location.href = match.href;
        });

        suggestionList.appendChild(div);
    });

        suggestionList.style.display = 'block';
    }

    function handleSearch() 
    {
        const search = searchInput.value.trim().toLowerCase();
        const matches = filterSearches(search);

        if (matches.length > 0)
        {
            window.location.href = matches[0].href;
        }
        else{
            suggestionList.innerHTML = '<div class = "suggestions-item">No match found</div>';
            suggestionList.style.display = 'block';
        }
    }
    
    function updateActiveItem(items){
        items.forEach(item => item.classList.remove('active'));
        if (currentIndex >= 0 && items[currentIndex])
        {
            items[currentIndex].classList.add('active');
        }
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        const matches = filterSearches(query);
        showSuggestions(matches);
    });

    searchInput.addEventListener('keydown', (e) => {
        const items = suggestionList.querySelectorAll('.suggestions-item');
        if (items.length === 0) return;

        if(e.key === 'ArrowDown')
        {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            updateActiveItem(items);
        }
        else if (e.key === 'ArrowUp')
        {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateActiveItem(items);
        }
        else if (e.key === 'Enter' && currentIndex > -1)
        {
                e.preventDefault();
                items[currentIndex].click();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
        {
            handleSearch();
        }
    });

    searchButton.addEventListener('click', () => {
        handleSearch();
    });

    document.addEventListener('click', e => {
        if (!document.querySelector('.search-container').contains(e.target))
        {
            suggestionList.style.display = 'none';
        }
    });
});
