
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">About De Decor</h1>
          <p className="mb-6 text-xl text-muted-foreground">
            Redefining luxury living through exceptional properties and design solutions.
          </p>
          <Separator className="mx-auto w-24" />
        </div>
      </div>
      
      {}
      <section className="container py-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <p className="mb-4">
              Founded in 2010, De Decor began with a simple vision: to connect discerning clients with exceptional properties and provide unparalleled design services.
            </p>
            <p className="mb-4">
              What started as a boutique agency has grown into a premier destination for luxury real estate and interior design, serving clients across the globe. Our dedication to excellence and attention to detail has established De Decor as an industry leader.
            </p>
            <p>
              Today, we continue to innovate and elevate the standard of luxury living, guided by our founding principles of integrity, quality, and exceptional service.
            </p>
          </div>
          <div className="order-first md:order-last">
            <img
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury interior"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
      
      {}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Mission & Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-decor-brown">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from property selection to design implementation, ensuring the highest quality experience for our clients.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-decor-brown">Integrity</h3>
              <p className="text-muted-foreground">
                We conduct business with the utmost integrity, transparency, and ethical standards, building lasting relationships based on trust.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-decor-brown">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace innovation in design and technology, constantly seeking new ways to enhance our services and create unique living experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {}
      <section className="container py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Leadership Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Alexandra Chen', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop' },
            { name: 'Michael Torres', role: 'Chief Design Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop' },
            { name: 'Emily Watson', role: 'Head of Property Sales', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop' },
            { name: 'David Park', role: 'Director of Marketing', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=987&auto=format&fit=crop' }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
