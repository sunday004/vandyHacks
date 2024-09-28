'use client'

import { useState } from 'react';
import { Firestore } from 'firebase/firestore'
import {getDoc, doc, collection, writeBatch,} from 'firebase/firestore';
import {db} from '/firebase'

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material'


export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const {isLoaded, isSignedIn, user} = useUser()
  const [flipped, setFlipped] = useState([])
  const router =  useRouter


  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const handleSubmit = async () => {
    // We'll implement the API call here
    if (!text.trim()) {
        alert('Please enter some text to generate flashcards.')
        return
    }

    try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          body: text,
        })
    
        if (!response.ok) {
          throw new Error('Failed to generate flashcards')
        }
    
        const data = await response.json()
        setFlashcards(data)
      } catch (error) {
        console.error('Error generating flashcards:', error)
        alert('An error occurred while generating flashcards. Please try again.')
      }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id] : !prev[id],
    }))
  }

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
        {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                Generated Flashcards
                </Typography>
                <Grid container spacing={2}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        {/* <CardContent>
                        <Typography variant="h6">Front:</Typography>
                        <Typography>{flashcard.front}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                        <Typography>{flashcard.back}</Typography>
                        </CardContent> */}

                      <CardActionArea onClick={() => {console.log(index) 
                      handleCardClick(index)}}>
                        <CardContent>
                            <Box sx={{ perspective: "1000px",
                              '& > div':{
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                transform: flipped[index]
                                ? 'rotateY(180deg)'
                                : 'rotateY(0deg)',
                              },
                              '& > div > div':{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 2,
                                boxSizing: 'border-box',

                              },
                              '& > div > div:nth-of-type(2)':{
                                transform: 'rotateY(180deg)',
                              },
                              
                            }}>
                            <div>
                                <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.front}
                                </Typography>
                                </div>
                                <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.back}
                                </Typography>
                                </div>
                            </div>
                            </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
        )}
      </Box>
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Save Flashcards
            </Button>
        </Box>
      )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
            Save
            </Button>
        </DialogActions>
        </Dialog>
      
      {/* We'll add flashcard display here */}
    </Container>
  )
}