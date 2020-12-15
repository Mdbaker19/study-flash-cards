const baseURL = "https://polydactyl-rapid-halloumi.glitch.me/cards";

const editCard = card => fetch(`${baseURL}/${card.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(card)
})
    .then(r => r.json())
    .then(d => {
        console.log(`Edited card ${JSON.stringify(d)}`);
    })
    .catch(err => console.error(err));

const deleteCard = id => fetch(`${baseURL}/${id}`, {
    method: "Delete",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then( r => r.json())
    .then( () => {
        console.log(`Deleted card with id: ${id}`);
    })
    .catch( err => console.error(err))

const addCard = card => fetch(`${baseURL}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(card)
})
    .then( r => r.json())
    .then(d => {
        console.log(`Created ${JSON.stringify(d)}`);
        return d.id;
    })
    .catch( err => console.error(err));