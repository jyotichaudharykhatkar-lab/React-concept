import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching posts from API
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add new post
    addPost: (state, action) => {
      const newPost = {
        id: state.items.length + 1,
        ...action.payload,
        userId: 1,
      };
      state.items.unshift(newPost);
    },
    // Update existing post
    updatePost: (state, action) => {
      const { id, ...updates } = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (post) {
        Object.assign(post, updates);
      }
    },
    // Delete post
    deletePost: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
