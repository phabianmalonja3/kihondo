

export  async function Categories() {
    const res = await fetch('http://localhost:8000/api/categories')
    const data = await res.json()
    return data;

}

