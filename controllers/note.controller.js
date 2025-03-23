import Note from "../models/notes.model.js";

export const createNoteController = async (req, res) => {
    
  const {title, description} = req.body;

  if(!title){
    return res.status(400).json({message: "Title is required"});
  }
  if(!description){
    return res.status(400).json({message: "Description is required"});
  }

  try {
    const newNote = new Note({title, description, userId: req.userId});
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

    
}

export const updateNoteController = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: { ...(title && { title }), ...(description && { description }) } }, // Update only provided fields
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteNoteController = async (req, res) => {
    const {id} = req.params;
    try {
      const note = await Note.findByIdAndDelete(id);
      if(!note){
        return res.status(404).json({message: "Note not found"});
      }
      res.status(202).json(note);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Something went wrong"});
    }
}

export const getNotesController = async (req, res) => {
  
  try {
    const notes = await Note.find({userId: req.userId});
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }

}