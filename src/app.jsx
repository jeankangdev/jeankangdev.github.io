import React from 'react';
import { useState, useEffect, memo, useCallback } from 'react';
import Search from './components/search/search';
import MovieList from './components/movie_list/movie_list';
import NomineeList from './components/nominee_list/nominee_list';
import MovieModal from './components/movie_modal/movie_modal';
import styles from './app.module.css';

const App = memo(({ pikamovie }) => {
  const [movies, setMovies] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (searchResult === '') {
      pikamovie
        .initialData()
        .then(movies => setMovies(movies));
    }
  }, [pikamovie, searchResult]);

  const search = useCallback((title) => {
    if (title) {
      pikamovie
      .searchByTitle(title)
      .then(movies => {
        if (movies) {
          setSearchResult(`Results for "${title}"`);
          setMovies(movies);
        } else {
          setSearchResult('Oops! We couldn\'t find the movie..try again?');
        }
      });
    } else {
      setSearchResult('');
    }
  }, []);

  const handleNominateClick = useCallback((id, isNominated) => {    
    if (isNominated === true) {
      addNominee(id);
    } else {
      deleteNominee(id);
    }
  }, []);

  const addNominee = (id) => {
    pikamovie
      .searchById(id)
      .then(movie => {
        if (!(nominees.find(nominee => nominee.imdbID === movie.id))) {
          const updated = ([...nominees, movie]);
          setNominees(updated);
        }
      }
    );
  }

  const deleteNominee = (id) => {
    pikamovie
      .searchById(id)
      .then(movie => {
        setNominees(nominees.map((nominee) => nominee.imdbID !== movie.imdbID));
      });
  }

  const openModal = useCallback((id) => {
    pikamovie
      .searchById(id)
      .then(movie => setSelectedMovie(movie));
    setIsModalActive(true);
  }, []);

  const closeModal = () => {
    setIsModalActive(false);
    setSelectedMovie(null);
  }

  return (
    <div className={styles.app}>
      {/* Search */}
      <Search onSearch={search} />

      {/* Search result comment */}
      {
        searchResult === '' &&
        <span className={styles.comment}>{searchResult}</span>
      }
      {
        searchResult &&
        <span className={styles.comment}>{searchResult}</span>
      }

      {/* Movie & Nomination list */}
      <div className={styles.tables}>
        <div className={styles.left}>
          <MovieList movies={movies} onMovieClick={openModal} onNominateClick={handleNominateClick} />
        </div>
        <div className={styles.right}>
          <NomineeList nominees={nominees} onDeleteClick={deleteNominee} />
        </div>
      </div>

      {/* Modal */}
      {
        isModalActive && selectedMovie &&
        <MovieModal selectedMovie={selectedMovie}
                    onModalClose={closeModal}
        />
      }
    </div>
    )
  }
);

export default App;
