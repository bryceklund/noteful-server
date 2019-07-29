TRUNCATE folders, notes RESTART IDENTITY CASCADE;

INSERT INTO folders (title)
    VALUES
        ('Socks'),
        ('Shoes'),
        ('Markers'),
        ('Saucepans'),
        ('Maths');

INSERT INTO notes (folderid, title, content)
    VALUES 
        (1, 'Freddy', 'Friedrich August von Alberti was a German geologist whose ground-breaking 1834 publication[1] recognized the unity of the three characteristic strata that compose the sedimentary deposits of the Triassic period in Northern Europe. From the fossils contained in the three distinct layers— of red bed sandstones, capped by limestones (Muschelkalk), followed by black shales— that are found throughout Germany and Northwest Europe, and are called the Trias (Latin trias meaning triad), Alberti detected that they formed a single stratigraphic formation; today it would be termed a system. He identified the Triassic as bearing a unique fossil fauna, bounded by the Permian extinction below and by another extinction above.'),
        (1, 'Go to town', 
            'Alberti grew up in Stuttgart and Rottweil where he was educated at the Gymnasium and went to the military school in Stuttgart. Afterwards he went back to Rottweil, a town 100 km (62 mi) south of Stuttgart. He learned the salt processing system and became a Salinentechniker (salt technician).'),
        (2, 'Nice', 
            'Alberti bought a house and lived in Rottenmünster, a former abbey 2 miles from Rottweil, from 1829 to 1853. While there he worked as manager for two salt companies. After he retired he moved to Heilbronn. He took a position as advisor, salt technician, and geologist.'),
        (2, 'Bingo', 
            'He invented the method of mining salt by pumping water into the mine; when the brine rose to the surface, he would allow the water to evaporate and then he would collect the salt.'),
        (3, 'Cats', 'The 1989 Tour de France was the 76th edition of one of cycling''s Grand Tours. The 3,285 km (2,041 mi) race began in Luxembourg with a prologue time trial on 1 July. It reached French soil during stage 4, ending in Paris on 23 July after 21 stages.'),
        (3, 'Boxes', 'I''ve got quite a few things in my backpack. I have truly succumbed to writing inane debris for these sample notes. I don''t know what to write, and frankly I''m spending far too much time on this.'),
        (4, 'Bing-pot!', 'Brooklyn-Nine-Nine is a good show.'),
        (5, 'Why', 'Did I make so many folders. This is far too many notes. I am scared for my life.');