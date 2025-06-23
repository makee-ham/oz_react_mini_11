import { supabaseClient } from "../supabase/context";

export async function addBookmark(userId, movie) {
  return await supabaseClient.from("bookmarks").upsert(
    {
      user_id: userId,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    },
    {
      onConflict: ["user_id", "movie_id"],
    }
  );
}

export async function removeBookmark(userId, movieId) {
  return await supabaseClient
    .from("bookmarks")
    .delete()
    .match({ user_id: userId, movie_id: movieId });
}

export async function getBookmarks(userId) {
  const { data, error } = await supabaseClient
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
}

export async function isBookmarked(userId, movieId) {
  const { data } = await supabaseClient
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  return data.length > 0;
}
