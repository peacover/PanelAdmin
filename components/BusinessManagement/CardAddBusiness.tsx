const CardAddBusiness = () => {
    return (
        <div>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="imageUrl">Image Url</label>
                <input type="file" name="imageUrl" id="imageUrl" />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols={30} rows={10}></textarea>
                <button type="submit">Add Business</button>
            </form>
        </div>
    )
}

export default CardAddBusiness
