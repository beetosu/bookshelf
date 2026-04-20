const BookStatus = {
    NotStarted: 1,
    InProgress: 2,
    Completed: 3
}

fetch('/bookshelf.json').then((res) => res.json()).then((bookshelf) => {
    const statusCount = {
        [BookStatus.NotStarted]: 0,
        [BookStatus.InProgress]: 0,
        [BookStatus.Completed]: 0
    },
        bookCount = bookshelf.books.length;

    bookshelf.books.forEach(book => {
        statusCount[book.status] = statusCount[book.status] += 1;

        const bookLink = document.getElementById(book.id);
        if (!bookLink) {
            console.warn(`a NOT FOUND FOR ${book.name}`)
            return;
        }

        bookLink.ariaLabel = book.name
        bookLink.href = `/books/${book.id}`;

        let bookStatusCss = "";

        switch (book.status) {
            case BookStatus.InProgress:
                bookStatusCss = "in-progess";
                break;
            case BookStatus.Completed:
                bookStatusCss = "completed";
                break;
            default:
                bookStatusCss = "not-started";
                break;
        }

        bookLink.className += " " + bookStatusCss;
    });

    Object.entries(statusCount).forEach(([status, statusCount]) => {
        const elementId = statusToId(status),
            statusBar = document.getElementById(elementId),
            statusLabel = document.querySelector(`#${elementId}  p`),
            percent = countToPercent(statusCount, bookCount);

        if (statusBar) {
            if (statusCount === 0) statusBar.hidden = true;
            statusBar.style = `width: ${percent}`
        }

        if (statusLabel) {
            console.log(statusLabel.innerHTML.replace('X', percent));
            statusLabel.innerHTML = statusLabel.innerHTML.replace('X', percent);
        }
    })    
});

function statusToId(statusString) {
    switch (Number(statusString)) {
        case BookStatus.Completed:
            return 'completed';
        case BookStatus.InProgress:
            return 'in-progress';
        default:
            return 'not-started';
    }
}

function countToPercent(statusCount, bookCount) {
    return `${Math.trunc((statusCount / bookCount) * 100)}%`
}