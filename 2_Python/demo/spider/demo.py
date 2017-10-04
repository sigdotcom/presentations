import scrapy
from scrapy.crawler import CrawlerProcess


class ACMSpider(scrapy.Spider):
    name = "ACMSpider"
    start_urls = ["http://localhost:8000/sigs/"]

    def parse(self, response):
        self.logger.info('A response from %s just arrived!', response.url)

        for card in response.css("li.cards__card"):
            description_text = card.xpath("p/text()").extract()[0].splitlines()
            normalized_description = [x.lstrip() for x in description_text]

            yield {
                "sig": card.xpath("a/h5/text()").extract(),
                "description": normalized_description,
                "links": card.xpath("a/@href").extract()
            }

if __name__ == "__main__":
    process = CrawlerProcess()
    process.crawl(ACMSpider)
    process.start() # the script will block here until the crawling is
