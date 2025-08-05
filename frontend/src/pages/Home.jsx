import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home-hero">
      <h1>Welcome to Too Good To Go</h1>
      <p>
        A peer-to-peer marketplace for students to buy, sell, or give away
        second-hand items on campus. Discover great deals and help your
        classmates at the same time!
      </p>
      <Link to="/register" className="cta-button">
        Get Started
      </Link>
    </section>
  );
}
