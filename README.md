# Robixx Review Radar

Advanced E-commerce Product Analytics & Review Intelligence

---

## About The Project

Robixx Review Radar analyzes product reviews scraped from e-commerce websites using a fastText sentiment analysis model running in a Flask backend. It dynamically visualizes review sentiments, rating distributions, trends, and keywords on an interactive frontend powered by Chart.js.

---

## Features

- Scrapes and collects product reviews and ratings.
- Performs sentiment classification with a custom-trained fastText model.
- Displays interactive charts for sentiment breakdown, rating distribution, review trends, and keywords.
- Supports light and dark theme toggle.
- Provides a REST API backend with Flask and CORS enabled.
- Frontend built with HTML, CSS, and Chart.js.
- No large trained models stored in the repository; users generate the model themselves.

---

## Libraries & Dependencies

### Backend (Python)

- `flask` - Web framework for building the API.
- `flask-cors` - Enabling CORS for frontend-backend communication.
- `fasttext` - Loading and predicting sentiments with the fastText model.
- `beautifulsoup4` - For scraping product reviews from HTML pages.
- `requests` - For making HTTP requests to e-commerce product pages.

pip install flask flask-cors fasttext beautifulsoup4 requests

text

### Frontend

- Chart.js (loaded through CDN) for rendering charts.

---

## Project Structure

- `websitesrvr.py` — Flask backend server with scraping and sentiment analysis REST endpoints.
- `data.py` — Script containing code to train and generate `sentiment_model.bin` using fastText.
- `sentiment_model.bin` — The trained fastText model binary file (not included in repo).
- `index.html` — Frontend UI with JavaScript chart logic.
- `.gitattributes` — (Optional) for Git LFS if used.
- `requirements.txt` — List of required Python packages.

---

## Generating the Sentiment Model

The repository does not include the pre-trained `sentiment_model.bin` due to file size constraints.

Users must run `data.py` to train and generate the model locally:

python data.py

text

Example snippet from `data.py`:

import fasttext

def train_model():
model = fasttext.train_supervised(input="training_data.txt", epoch=25, lr=1.0, wordNgrams=2, verbose=2, minCount=1)
model.save_model("sentiment_model.bin")

if name == "main":
train_model()

text

---

## Running the Application

1. Clone this repository:

git clone https://github.com/JuliusSeq/BitNBuild-25_Robixx.git
cd BitNBuild-25_Robixx

text

2. Install dependencies:

pip install -r requirements.txt

text

3. Train and generate the sentiment model:

python data.py

text

4. Start the Flask backend server:

python app.py

text

5. Open the frontend by serving or directly opening `index.html` in your browser.

6. Enter a product URL in the frontend and click “Analyze Product” to view analytics.

---

## Notes

- Make sure your Python environment includes all dependencies.
- The app requires internet access to scrape product reviews from e-commerce sites.
- Frontend fetches analysis data dynamically from backend API.
- The `sentiment_model.bin` file must be generated locally by users using `data.py`.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [fastText](https://fasttext.cc/)
- [Flask](https://flask.palletsprojects.com/)
- [Chart.js](https://www.chartjs.org/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)
This README explicitly explains that the sentiment model binary is not in the repo, must be generated using data.py, and all required libraries are specified for easy setup.
