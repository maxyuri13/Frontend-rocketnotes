import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../../components/Header';
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from "../../components/ButtonText";
import { Container, Form } from './styles';
import { api } from '../../services/api';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  function handleAddLink() {
    if (newLink.trim() === "" || links.includes(newLink)) {
      return alert(newLink.trim() === "" ? "Enter a link before adding." : "This link already exists.");
    }
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    if (newTag.trim() === "" || tags.includes(newTag)) {
      return alert(newTag.trim() === "" ? "Enter a tag before adding." : "This tag already exists.");
    }
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if (isSaving || !title || !description || links.length === 0 || tags.length === 0) {
      return alert("Please fill out the form completely before saving.");
    }

    if (newLink.trim() !== "" || newTag.trim() !== "") {
      return alert("Finish editing the new link and tag or clear the fields before saving.");
    }
  
    setIsSaving(true);
  
    try {
      await api.post("/notes", {
        title,
        description,
        tags,
        links
      });
      alert("Note created successfully!");
      navigate(-1);
    } catch (error) {
      alert("Error saving the note. Please try again later.");
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Create note</h1>
            <ButtonText 
              title="Back"
              onClick={handleBack}
            />
          </header>
          <Input 
            placeholder="Title" 
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observations"
            onChange={e => setDescription(e.target.value)}
          />
          <Section title="Useful links">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="New link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)} 
              onClick={handleAddLink}
            />
          </Section>
          <Section title="Markers">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem 
                isNew 
                placeholder="New tag" 
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button 
            title="Save"
            onClick={handleNewNote}
            disabled={isSaving}
          />
        </Form>
      </main>
    </Container>
  );
}