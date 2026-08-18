# Fresh uniqueness review

The previous generated audit folder was deleted before this review. The current source tree was scanned afresh.

## Findings

| Metric | Result |
|---|---:|
| Page files scanned | 304 |
| Unique page slugs | 304 |
| Duplicate page slugs | 0 |
| Pages sharing underlying component implementations | 28 |
| Shared component groups | 13 |
| Unique replacement components planned | 28 |

The flagged pages are not duplicate route ideas, but they do import the same underlying page-level component. Because the requirement is that no page idea be reused, each flagged page has a unique replacement component name and a distinct redesign direction.

## Bespoke redesign plan

| Page | Current shared component | Required unique component | Direction |
|---|---|---|---|
| `/bhuntu-love-polaroids` | `BhuntuLovePolaroids` | `BespokeBhuntuLovePolaroidsScene` | Cinematic vertical reveal; gesture-led reveal; warm lacquer and ink; recognition. |
| `/room3` | `BhuntuLovePolaroids` | `BespokeRoom3Scene` | Editorial split narrative; drag-and-place composition; midnight blue and silver; quiet gratitude. |
| `/bhuntu-trivia-showdown` | `BhuntuTriviaShowdown` | `BespokeBhuntuTriviaShowdownScene` | Interactive map chamber; cursor-lit discovery; apricot paper and charcoal; playful surprise. |
| `/room4` | `BhuntuTriviaShowdown` | `BespokeRoom4Scene` | Tactile paper laboratory; timed sensory transition; electric violet on black; earned vulnerability. |
| `/bhuntu-voice-note-archive` | `BhuntuVoiceNoteArchive` | `BespokeBhuntuVoiceNoteArchiveScene` | Ambient audio stage; voice-reactive response; moss green and brass; future longing. |
| `/room10` | `BhuntuVoiceNoteArchive` | `BespokeRoom10Scene` | Constellation workspace; progressive scroll transformation; frosted blue and pearl; celebration. |
| `/bonus-arcade` | `WorldShell` | `BespokeBonusArcadeScene` | Phone-native conversation; tap-sequenced micro-story; wine red and cream; relief. |
| `/curated-journey` | `WorldShell` | `BespokeCuratedJourneyScene` | Masonry memory cabinet; freeform canvas exploration; sunrise coral and sand; wonder. |
| `/bucket-list` | `TravelBucketList` | `BespokeBucketListScene` | Single-word typography room; long-press unlock; monochrome editorial; devotion. |
| `/room8` | `TravelBucketList` | `BespokeRoom8Scene` | Kinetic timeline; choice-driven branching; amber firelight; restful closeness. |
| `/distance` | `NepalgunjToOsakaFlightSim` | `BespokeDistanceScene` | Cinematic vertical reveal; gesture-led reveal; warm lacquer and ink; recognition. |
| `/nepalgunj-to-osaka-flight-sim` | `NepalgunjToOsakaFlightSim` | `BespokeNepalgunjToOsakaFlightSimScene` | Editorial split narrative; drag-and-place composition; midnight blue and silver; quiet gratitude. |
| `/room2` | `NepalgunjToOsakaFlightSim` | `BespokeRoom2Scene` | Interactive map chamber; cursor-lit discovery; apricot paper and charcoal; playful surprise. |
| `/first-moments-timeline` | `FirstMomentsTimeline` | `BespokeFirstMomentsTimelineScene` | Tactile paper laboratory; timed sensory transition; electric violet on black; earned vulnerability. |
| `/room6` | `FirstMomentsTimeline` | `BespokeRoom6Scene` | Ambient audio stage; voice-reactive response; moss green and brass; future longing. |
| `/story` | `FirstMomentsTimeline` | `BespokeStoryScene` | Constellation workspace; progressive scroll transformation; frosted blue and pearl; celebration. |
| `/love-coronation-ceremony` | `LoveCoronationCeremony` | `BespokeLoveCoronationCeremonyScene` | Phone-native conversation; tap-sequenced micro-story; wine red and cream; relief. |
| `/room11` | `LoveCoronationCeremony` | `BespokeRoom11Scene` | Masonry memory cabinet; freeform canvas exploration; sunrise coral and sand; wonder. |
| `/love-envelope` | `LoveEnvelope` | `BespokeLoveEnvelopeScene` | Single-word typography room; long-press unlock; monochrome editorial; devotion. |
| `/room7` | `LoveEnvelope` | `BespokeRoom7Scene` | Kinetic timeline; choice-driven branching; amber firelight; restful closeness. |
| `/love-grand-finale` | `LoveGrandFinale` | `BespokeLoveGrandFinaleScene` | Cinematic vertical reveal; gesture-led reveal; warm lacquer and ink; recognition. |
| `/room12` | `LoveGrandFinale` | `BespokeRoom12Scene` | Editorial split narrative; drag-and-place composition; midnight blue and silver; quiet gratitude. |
| `/love-love-story-comic-strip` | `LoveLoveStoryComicStrip` | `BespokeLoveLoveStoryComicStripScene` | Interactive map chamber; cursor-lit discovery; apricot paper and charcoal; playful surprise. |
| `/room5` | `LoveLoveStoryComicStrip` | `BespokeRoom5Scene` | Tactile paper laboratory; timed sensory transition; electric violet on black; earned vulnerability. |
| `/love-scratch-card` | `LoveScratchCard` | `BespokeLoveScratchCardScene` | Ambient audio stage; voice-reactive response; moss green and brass; future longing. |
| `/room1` | `LoveScratchCard` | `BespokeRoom1Scene` | Constellation workspace; progressive scroll transformation; frosted blue and pearl; celebration. |
| `/promise-tree` | `SakuraPromiseTree` | `BespokePromiseTreeScene` | Phone-native conversation; tap-sequenced micro-story; wine red and cream; relief. |
| `/room9` | `SakuraPromiseTree` | `BespokeRoom9Scene` | Masonry memory cabinet; freeform canvas exploration; sunrise coral and sand; wonder. |

## Exported deliverables

The attached project now contains the fresh source-based outputs under `audit/` and dedicated copies under `exports/`:

- `exports/final_unique_component_implementation_list.csv` contains all 28 flagged pages.
- `exports/final_bespoke_redesign_plan.csv` contains the structured redesign plan.
- `exports/final_bespoke_redesign_plan.md` contains the readable redesign brief.
- `audit/fresh_page_inventory.csv` contains all 304 scanned pages.
- `audit/fresh_audit_summary.md` contains the fresh audit summary.

The command `npm run audit:fresh` now regenerates the fresh audit and fails if duplicate page slugs are introduced.
