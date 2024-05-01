import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io'; // For File class

class MyHomePage extends StatefulWidget {
  final String title;

  const MyHomePage({super.key, required this.title});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  final List<File> _uploadedImages = []; // List to store uploaded images
  final List<bool> _likes = []; // List to store uploaded images

  int _currentImageIndex = 0; // Index to track the current image

  void _incrementCounter() {
    setState(() {
      _likes[_currentImageIndex] = true;
    });
  }

  void _decrementCounter() {
    setState(() {
      _likes[_currentImageIndex] = false;
    });
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _uploadedImages
            .add(File(pickedFile.path)); // Add the new image to the list
        _likes.add(false);
        _currentImageIndex = _uploadedImages.length -
            1; // Set the current index to the last image
      });
    } else {
      print("No image selected.");
    }
  }

  void _previousImage() {
    if (_currentImageIndex > 0) {
      setState(() {
        _currentImageIndex--; // Move to the previous image
      });
    }
  }

  void _nextImage() {
    if (_currentImageIndex < _uploadedImages.length - 1) {
      setState(() {
        _currentImageIndex++; // Move to the next image
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pushReplacementNamed(context, "/login");
            },
            icon: const Icon(Icons.logout_outlined),
          ),
        ],
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (_uploadedImages.isNotEmpty)
              Center(
                child: Image.file(
                  _uploadedImages[
                      _currentImageIndex], // Display the current image
                  height: 200,
                ),
              )
            else
              const Center(child: Text("No images uploaded.")),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                IconButton(
                  onPressed: _previousImage,
                  icon: const Icon(Icons.arrow_circle_left),
                ),
                TextButton(
                  style: ButtonStyle(
                    foregroundColor: (_likes.isNotEmpty)
                        ? (_likes[_currentImageIndex])
                            ? MaterialStateProperty.all<Color>(
                                Colors.green[800]!)
                            : MaterialStateProperty.all<Color>(Colors.grey)
                        : MaterialStateProperty.all<Color>(Colors.grey),
                  ),
                  onPressed:
                      (_uploadedImages.isNotEmpty) ? _incrementCounter : null,
                  child: const Row(
                    children: [
                      Icon(Icons.thumb_up),
                      SizedBox(width: 10),
                      Text("Liked"),
                    ],
                  ),
                ),
                TextButton(
                  style: ButtonStyle(
                    foregroundColor: (_likes.isNotEmpty)
                        ? (_likes.isNotEmpty && _likes[_currentImageIndex])
                            ? MaterialStateProperty.all<Color>(Colors.grey)
                            : MaterialStateProperty.all<Color>(Colors.red[800]!)
                        : MaterialStateProperty.all<Color>(Colors.grey),
                  ),
                  onPressed:
                      (_uploadedImages.isNotEmpty) ? _decrementCounter : null,
                  child: const Row(
                    children: [
                      Icon(Icons.thumb_down),
                      SizedBox(width: 10),
                      Text("Unliked"),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: _nextImage,
                  icon: const Icon(Icons.arrow_circle_right),
                ),
              ],
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _pickImage, // Use _pickImage to open image picker
        tooltip: 'Pick Image',
        child: const Icon(Icons.camera_alt),
      ),
    );
  }
}
