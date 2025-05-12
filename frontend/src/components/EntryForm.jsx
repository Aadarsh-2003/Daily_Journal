import { useState } from 'react';
import { createEntry } from '../api';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card } from "@chakra-ui/react"

export default function EntryForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await createEntry({ title, content });
      navigate('/');
    };
  
    return (
      <div>
        <h1>New Journal Entry</h1><br/>
        <form onSubmit={handleSubmit}>
          <Card.Root width="1020px" height={530}>
                      <Card.Body gap="2">
                        {/* <Avatar.Root size="lg" shape="rounded">
                          <Avatar.Image src="https://picsum.photos/200/300" />
                          <Avatar.Fallback name="Nue Camp" />
                        </Avatar.Root> */}
                        <Card.Title mt="2"><input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          /></Card.Title>
                        <br/>
                        <Card.Description>
                          <textarea
                            rows={16}
                            cols={147}
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                          />
                        </Card.Description>
                      </Card.Body>
                      <Card.Footer justifyContent="flex-end">
                        {/* <Button variant="outline">View</Button> */}
                        <Button type="submit">Save</Button>
                      </Card.Footer>
                  </Card.Root>

        </form>
      </div>
    );
  }