import { describe, expect, it } from 'vitest';

import { trainingCourses } from '@/data/training';
import { workshops } from '@/data/workshops';
import { products } from '@/data/products';
import { projectTemplate, publishedProjects } from '@/data/projects';
import { faqs } from '@/data/faqs';
import { journeyStages } from '@/data/journey';

const TBA = 'To be announced';

describe('training content', () => {
  it('ships all six courses with complete, non-placeholder copy', () => {
    expect(trainingCourses).toHaveLength(6);
    for (const course of trainingCourses) {
      expect(course.title.length).toBeGreaterThan(2);
      expect(course.description.length).toBeGreaterThan(10);
      expect(course.audience.length).toBeGreaterThan(5);
      expect(course.skills.length).toBeGreaterThan(2);
      expect(course.detail.syllabus).toBeTruthy();
    }
  });

  it('never invents schedule or price details', () => {
    for (const course of trainingCourses) {
      expect(course.detail.schedule.toLowerCase()).toContain('to be announced');
      expect(course.detail.price.toLowerCase()).toContain('to be announced');
    }
  });

  it('uses unique ids', () => {
    const ids = trainingCourses.map((course) => course.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('workshop content', () => {
  it('flags sample listings and never invents logistics for them', () => {
    expect(workshops.length).toBeGreaterThan(0);
    for (const workshop of workshops) {
      if (workshop.isExample) {
        expect(workshop.date).toBe(TBA);
        expect(workshop.time).toBe(TBA);
        expect(workshop.format).toBe(TBA);
        expect(workshop.location).toBe(TBA);
        expect(workshop.statusLabel).toBeTruthy();
      }
    }
  });
});

describe('product content', () => {
  it('has unique slugs and complete cards', () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const product of products) {
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.description.length).toBeGreaterThan(20);
      expect(product.details.length).toBeGreaterThan(20);
      expect(product.includes.length).toBeGreaterThan(0);
      expect(['lime', 'sand', 'sky', 'violet', 'teal', 'rose']).toContain(product.cover.tone);
    }
  });

  it('labels example prices on example products', () => {
    for (const product of products) {
      if (product.isExample && product.price) {
        expect(product.price.isExample).toBe(true);
      }
    }
  });
});

describe('project content', () => {
  it('starts with no published projects and a clearly-marked template', () => {
    expect(publishedProjects()).toHaveLength(0);
    expect(projectTemplate.isExample).toBe(true);
    expect(projectTemplate.published).toBe(false);
  });
});

describe('faq and journey content', () => {
  it('answers all eight required questions', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(8);
    for (const faq of faqs) {
      expect(faq.question.length).toBeGreaterThan(5);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it('shows five journey stages', () => {
    expect(journeyStages).toHaveLength(5);
    expect(journeyStages.map((stage) => stage.stage)).toEqual(['01', '02', '03', '04', '05']);
  });
});
