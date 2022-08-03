import { getAPIHeader, getApiURL} from "./api.helpers";

export const fetchAddToDo = (title, description) => {

    if (title && description) {
        return new Promise((resolve, reject) => {
            fetch(`${getApiURL()}Item`, {
                    method: 'POST',
                    headers: getAPIHeader(),
                    redirect: 'follow',
                    body: JSON.stringify(
                        {
                            title: title,
                            description: description,
                        }
                    )
                })
                .then(response => response.text())
                    .then(res => {
                        const result = JSON.parse(res);
                        resolve(result)
                    })
            .catch(error => reject({
                description: error,
                status: false
            }));
        });
    }
}

export const fetchGetAllToDos = () => {
    return new Promise((resolve, reject) => {
        fetch(`${getApiURL()}Item`, {
                method: 'GET',
                headers: getAPIHeader(),
                redirect: 'follow',
            })
            .then(response => response.text())
                .then(res => {
                    const result = JSON.parse(res);
                    resolve(result)
                })
        .catch(error => reject({
            description: error,
            status: false
        }));
    });
}

export const fetchGetSingleToDo = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${getApiURL()}Item/${id}`, {
                method: 'GET',
                headers: getAPIHeader(),
                redirect: 'follow',
            })
            .then(response => response.text())
                .then(res => {
                    const result = JSON.parse(res);
                    resolve(result)
                })
        .catch(error => reject({
            description: error,
            status: false
        }));
    });
}

export const fetchUpdateToDo = (id, task) => {
    return new Promise((resolve, reject) => {
        fetch(`${getApiURL()}Item/${id}`, {
                method: 'Put',
                headers: getAPIHeader(),
                redirect: 'follow',
                body: JSON.stringify(task)
            })
        .then(response => (response.status === 400) ? reject(false) : resolve(true))
        .catch(error => reject({
            description: error,
            status: false
        }));
    });
}

export const fetchDeleteToDo = (id) => {
    if (id) return new Promise((resolve, reject) => {
        fetch(`${getApiURL()}Item/${id}`, {
                method: 'DELETE',
                headers: getAPIHeader(),
                redirect: 'follow',
            })
            .then(response => (response.status === 404) ? reject(false) : resolve(true))
            .catch(() => reject(false));
    });
}