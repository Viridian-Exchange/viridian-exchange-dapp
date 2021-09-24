export const GET_FOLLOWERS_QUERY =
    "query getFollowers " +
    "{ listUsers(filter: {username: {contains: ''}}) " +
    "{items {username displayName bio website twitter profilePhotoURL coverPhotoURL following followers likes } }";

export const listUsers = (followers) => {
    return "query getFollowers {\n" +
        "  listUsers(filter: {username: {contains: \"\"}}) {\n" +
        "    items {\n" +
        "      username\n" +
        "      displayName\n" +
        "      bio\n" +
        "      website\n" +
        "      twitter\n" +
        "      profilePhotoURL\n" +
        "      coverPhotoURL\n" +
        "      following\n" +
        "      followers\n" +
        "      likes\n" +
        "    }\n" +
        "  }\n" +
        "}";
}







