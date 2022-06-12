const Author = ({createdBy}) => {
    let authors = [];

    createdBy.forEach(author => {
        if (author.profile_path !== null) {
            authors.push(
                <div className={"author-container"} key={author.id}>
                    <div className={"header-container"}>
                        <div className={"author-name"}>
                            <h6>
                                <strong>
                                    {author.name}
                                </strong>
                            </h6>
                        </div>
                        <div className={"author-image"}>
                            <img src={process.env.REACT_APP_API_AUTHOR_PATH + author.profile_path}/>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return authors;
}

export default Author;