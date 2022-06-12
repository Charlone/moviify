const Author = ({createdBy}) => {
    let authors = [];

    createdBy.forEach(author => {
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
                        <img height={author.profile_path === null ? '278px' : null} width={author.profile_path === null ? '185px' : null} src={author.profile_path !== null ? process.env.REACT_APP_API_AUTHOR_PATH + author.profile_path : '/no_image.png'}/>
                    </div>
                </div>
            </div>
        );
    });

    return authors;
}

export default Author;