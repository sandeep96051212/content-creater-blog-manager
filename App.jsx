import { useState } from 'react'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "First Blog Post", status: "Draft", date: "2026-06-23" },
    { id: 2, title: "YouTube Script Ideas", status: "Published", date: "2026-06-22" }
  ])

  const [newTitle, setNewTitle] = useState("")

  const addPost = () => {
    if (!newTitle.trim()) return
    setPosts([...posts, {
      id: Date.now(),
      title: newTitle,
      status: "Draft",
      date: new Date().toISOString().split('T')[0]
    }])
    setNewTitle("")
  }

  const toggleStatus = (id) => {
    setPosts(posts.map(post =>
      post.id === id
       ? {...post, status: post.status === "Draft"? "Published" : "Draft" }
        : post
    ))
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id!== id))
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui' }}>
      <h1>📝 Content Creator Blog Manager</h1>

      <div style={{ margin: '30px 0', display: 'flex', gap: '10px' }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter blog post title..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          onKeyDown={(e) => e.key === 'Enter' && addPost()}
        />
        <button onClick={addPost} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Post
        </button>
      </div>

      <div>
        {posts.map(post => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{post.title}</h3>
              <span style={{
                fontSize: '14px',
                background: post.status === 'Published'? '#d4edda' : '#fff3cd',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {post.status}
              </span>
              <span style={{ fontSize: '14px', marginLeft: '10px', color: '#666' }}>
                {post.date}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => toggleStatus(post.id)} style={{ cursor: 'pointer' }}>
                {post.status === 'Draft'? 'Publish' : 'Unpublish'}
              </button>
              <button onClick={() => deletePost(post.id)} style={{ cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}